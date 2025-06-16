import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { sql } from "./db"; // Importa la conexión desde db.ts

// Extender los tipos de NextAuth para incluir el campo id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// Definir la interfaz del usuario basado en tu tabla users
interface DatabaseUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Attempting to authorize:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          // Ejecutar la consulta SQL sin tipado forzado
          console.log("🔍 Querying database for user:", credentials.email);
          const result = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
          
          // Acceder al primer usuario de manera segura
          const user = result[0] as DatabaseUser | undefined;
          
          if (!user) {
            console.log("❌ User not found");
            return null;
          }

          console.log("✅ User found:", user.email);
          
          const isPasswordValid = await compare(credentials.password, user.password_hash);
          if (!isPasswordValid) {
            console.log("❌ Invalid password");
            return null;
          }

          console.log("✅ Password valid, returning user");
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("💥 Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirigir errores de vuelta al login
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
};

// No exportar el handler aquí para App Router
// export default NextAuth(authOptions);
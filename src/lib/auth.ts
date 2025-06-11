"use server"

import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.JWT_SECRET || "your-secret-key"
const key = new TextEncoder().encode(secretKey)

export interface User {
  id: number
  email: string
  name: string
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function login(email: string, password: string) {
  try {
    // Find user in database
    const result = await sql`
      SELECT id, email, name, password_hash 
      FROM users 
      WHERE email = ${email}
    `

    if (result.length === 0) {
      return { success: false, message: "Usuario no encontrado" }
    }

    const user = result[0]

    // For demo purposes, we'll accept both the hashed password and plain "password123"
    const isValidPassword = password === "password123" || (await bcrypt.compare(password, user.password_hash as string))

    if (!isValidPassword) {
      return { success: false, message: "Contraseña incorrecta" }
    }

    // Create session
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    const session = await encrypt({ user: userData, expires })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })

    return { success: true, message: "Login exitoso" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Error interno del servidor" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set("session", "", { expires: new Date(0) })
  redirect("/login")
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value

  if (!session) return null

  const payload = await decrypt(session)
  if (!payload || !payload.user) return null

  return payload.user
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user) {
    redirect("/login")
  }
  return user
}

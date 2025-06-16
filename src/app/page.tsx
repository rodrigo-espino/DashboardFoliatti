"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
    else{
      router.push("/login");
    }
  }, [status]);

  return (
    <div>
      {status === "loading" ? "Cargando..." : "Bienvenido"}
    </div>
  );
}

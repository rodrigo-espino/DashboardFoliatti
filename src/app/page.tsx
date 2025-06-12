"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
  // Redirigir a la página de login
  const router = useRouter();

useEffect(() => {
    router.push('/login'); // Redirige a /login después del renderizado
  }, [router]);
  
}

"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function DashboardPage() {
  
  const router = useRouter()
  // Redirigir a la página de depósitos
useEffect(() => {
    router.push('/dashboard/deposits'); // Redirige a /login después del renderizado
  }, [router]);
}

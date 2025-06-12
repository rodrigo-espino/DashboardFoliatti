import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter()
  // Redirigir a la página de depósitos
  router.push('/login');
}

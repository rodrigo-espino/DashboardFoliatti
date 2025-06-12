import { useRouter } from 'next/navigation';

export default function Home() {
  // Redirigir a la página de login
  const router = useRouter();

  router.push('/login');

}

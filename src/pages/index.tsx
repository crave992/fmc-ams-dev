import { useEffect } from 'react';
import { useRouter } from 'next/router';
import About from '@/components/main/About';
import Layout from '@/layouts/Main';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the admin page after 3 seconds (3000 milliseconds)
    const redirectTimer = setTimeout(() => {
      router.push('/admin');
    }, 3000);

    return () => clearTimeout(redirectTimer); // Clear the timer on unmount to avoid memory leaks
  }, []);

  return (
    <>
      <Layout>
        <About />
      </Layout>
    </>
  );
}

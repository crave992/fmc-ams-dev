// pages/admin/dashboard.tsx
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Admin: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login'); // Redirect to /admin/login
  }, []); // The empty dependency array ensures the effect runs only once after component mount

  return (
    <></>
  );
};

export default Admin;
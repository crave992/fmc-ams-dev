import { useEffect, useState, ReactNode } from 'react'; // Import ReactNode
import { useRouter } from 'next/router';
import useFirebase from '../hook/useFirebase';

interface AuthGuardProps {
  children: ReactNode; // Define children prop as ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        setIsAuthenticated(!!user);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [firebase]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]);

  // Render the children only if the authentication status is known (not null)
  return isAuthenticated !== null ? <>{children}</> : null;
};

export default AuthGuard;

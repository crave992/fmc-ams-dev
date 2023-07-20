// components/Logout.tsx
import { Button } from '@mui/material';
import useFirebase from '@/hook/useFirebase';

const Logout = () => {
  const firebase = useFirebase();

  const handleLogout = async () => {
    try {
      if (firebase) {
        await firebase.auth().signOut();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;

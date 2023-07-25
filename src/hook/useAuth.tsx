// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function useAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const userId = user?.uid || '';
  const userName = user?.displayName || '';

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) {
      console.error('User not authenticated.');
      return;
    }

    const email = user.email;
    if (!email) {
      console.error('User email not available.');
      return;
    }

    try {
      // Reauthenticate the user with their current credentials before updating the password
      const credentials = firebase.auth.EmailAuthProvider.credential(email, currentPassword);
      await user.reauthenticateWithCredential(credentials);
      await user.updatePassword(newPassword);
      console.log('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  return { user, userId, userName, changePassword };
}

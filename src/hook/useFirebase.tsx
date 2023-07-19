// hooks/useFirebase.ts
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDaVwoV3y_dKhU9XmNWhXD2UCziCk-U5z8",
  authDomain: "fmc-ams.firebaseapp.com",
  databaseURL: "https://fmc-ams-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fmc-ams",
  storageBucket: "fmc-ams.appspot.com",
  messagingSenderId: "841944516298",
  appId: "1:841944516298:web:6ef90f43309c64981d1633",
  measurementId: "G-BX0XJMX24W"
};

export default function useFirebase() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase app is already initialized
    if (!firebase.apps.length) {
      // Initialize Firebase with the config
      firebase.initializeApp(firebaseConfig);
    }

    setFirebaseInitialized(true);

    // No need to delete the app, leave it initialized for the lifetime of your app

    // You can optionally add any additional Firebase configurations here, such as Firestore settings, etc.

    // The hook will only run this effect once on mount, ensuring Firebase is initialized only once.

    // Cleanup function (optional, if needed)
    // return () => {
    //   // Perform any cleanup actions here (if needed)
    // };
  }, []);

  return firebaseInitialized ? firebase : null;
}

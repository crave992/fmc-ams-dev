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

  }, []);

  return firebaseInitialized ? firebase : null;
}
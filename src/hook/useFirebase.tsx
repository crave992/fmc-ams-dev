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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // Retrieve the default app if it already exists
    }

    setFirebaseInitialized(true);

    return () => {
      firebase.app().delete();
    };
  }, []);

  return firebaseInitialized ? firebase : null;
}

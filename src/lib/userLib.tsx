import useFirebase from "@/hook/useFirebase";
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';

export function getCurrentUserInfo() {
    const firebaseInstance = useFirebase();
    const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData | null>(null);
  
    useEffect(() => {
      if (firebaseInstance) {
        // Check if there is a user authenticated
        const unsubscribe = firebaseInstance.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, fetch the user information
            firebaseInstance.firestore().collection('users').doc(user.uid).get()
              .then((doc) => {
                if (doc.exists) {
                  setUserInfo(doc.data() as firebase.firestore.DocumentData); // Cast data to DocumentData
                } else {
                  console.log("No user data found.");
                  setUserInfo(null); // Set state to null if the document doesn't exist
                }
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
              });
          } else {
            // User is signed out, reset user info
            setUserInfo(null);
          }
        });
  
        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
      }
    }, [firebaseInstance]);
  
    return userInfo;
  }
  
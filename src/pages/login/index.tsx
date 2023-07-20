import React, { useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import Link from "next/link";
import SinglePageLayout from "@/layouts/SinglePage";
import Image from "next/image";
import useFirebase from "@/hook/useFirebase"; // Replace "path/to" with the actual path to useFirebase.ts

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const firebase = useFirebase(); // Get the Firebase instance

  const handleModalClose = () => {
    setErrorModalOpen(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      // Check if Firebase is initialized
      if (firebase) {
        // Perform Firebase login
        await firebase.auth().signInWithEmailAndPassword(email, password);

        // On successful login, navigate to the dashboard
        window.location.href = "/admin/dashboard"; // Redirect using window.location.href
      } else {
        throw new Error("Firebase is not initialized.");
      }
    } catch (error) {
      setErrorModalOpen(true);
    }
  };

  return (
    <SinglePageLayout>
      <Image src="/img/FMC.webp" width={135} height={49} alt="FMC" className="mx-auto mb-5"/>
      <h2 className="mb-4 font-extrabold text-center text-2xl">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="outlined" type="submit" className="w-full">
          Login
        </Button>
      </form>

      {/* Modal for displaying errors */}
      <Modal open={errorModalOpen} onClose={handleModalClose}>
        <div className="bg-white p-8 mx-auto mt-10 w-1/3 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p>There was an error during login. Please try again.</p>
          <Button className="mt-4" variant="outlined" onClick={handleModalClose}>
            Close
          </Button>
        </div>
      </Modal>

      <p className="mt-4">
        Don't have an account? <Link href="/register">Sign Up</Link>
      </p>
    </SinglePageLayout>
  );
}

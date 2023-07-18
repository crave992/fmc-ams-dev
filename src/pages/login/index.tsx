import React, { useState } from "react"
import { Button, TextField } from "@mui/material"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
  }
  return (
    <div>
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
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
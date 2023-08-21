import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';

const LoginEmailAndPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setMessage(`User logged in: ${userCredential.user?.email}`);
    } catch (error) {
      setMessage(`${error}`);
    }
  };

  return (
    <div>
      <h2>Login with Email and Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginEmailAndPassword;

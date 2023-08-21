import React, { useContext, useEffect } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';
import { AuthContext } from '../Auth/AuthProvider';
import axios, { AxiosError } from 'axios';
import { signOut } from 'firebase/auth';
import ILoginGoogleProps from './ILoginGoogleProps';

const LoginGoogle: React.FC<ILoginGoogleProps> = ({ config, setMessage }) => {
  const { isLoggedIn, setIsLoggedIn, setUserId } = useContext(AuthContext);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');

    if (storedIsLoggedIn && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, [setIsLoggedIn, setUserId]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { email, displayName } = userCredential.user;
      if (email) {
        await createUser(email, displayName || '');
        const userId = await getUserIdByEmail(email);
        setUserId(userId);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId);
        setMessage(`User logged in with Google: ${email}`);
      } else {
        setMessage(
          'User email not available. Please ensure you allow access to your email during the login process.'
        );
      }
    } catch (error) {
      setMessage(`Error logging in with Google: ${(error as Error).message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUserId('');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      setMessage('User logged out successfully.');
    } catch (error) {
      setMessage(`Error logging out: ${(error as Error).message}`);
    }
  };

  const createUser = async (email: string, displayName: string) => {
    try {
      await axios.post(`${config.apiUrl}/users`, {
        email: email,
        displayName: displayName,
      });
    } catch (error) {
      console.log('Response:', (error as AxiosError).response?.data);
    }
  };

  const getUserIdByEmail = async (email: string) => {
    try {
      const response = await axios.get(`${config.apiUrl}/users/email/${email}`);
      return response.data.userId;
    } catch (error) {
      console.error('Failed to get userId:', error);
      return null;
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </>
      )}
    </div>
  );
};

export default LoginGoogle;

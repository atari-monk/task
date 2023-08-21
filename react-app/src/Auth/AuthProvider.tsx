import React, { useState } from 'react';
import IAuthContextProps from './IAuthContextProps';
import IAuthProviderProps from './IAuthProviderProps';

export const AuthContext = React.createContext<IAuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: '',
  setUserId: () => {},
});

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string>('');
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

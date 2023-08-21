import React from 'react';

export default interface IAuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

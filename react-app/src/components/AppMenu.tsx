import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { AppName, ButtonsRow, Message, StyledAppMenu } from '../styles';
import appConfig from '../config/appConfig';
import LoginGoogle from './../Login/LoginGoogle';

const AppMenu: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <StyledAppMenu>
      <AppName>Task App</AppName>
      <ButtonsRow>
        <LoginGoogle config={appConfig} setMessage={setMessage} />
        <DarkModeToggle />
      </ButtonsRow>
      {message && <Message>{message}</Message>}
    </StyledAppMenu>
  );
};

export default AppMenu;

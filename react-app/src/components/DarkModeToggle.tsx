import { useState, useEffect } from 'react';
import { StyledDarkModeToggle, setDarkMode } from '../styles';

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkModeState] = useState<boolean>(true);

  useEffect(() => {
    setDarkMode(darkMode);
    return () => setDarkMode(false);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    setDarkMode(newDarkMode);
  };

  return (
    <StyledDarkModeToggle darkMode={darkMode} onClick={toggleDarkMode}>
      {darkMode ? 'Light' : 'Dark'}
    </StyledDarkModeToggle>
  );
};

export default DarkModeToggle;

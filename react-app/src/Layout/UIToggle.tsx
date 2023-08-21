import React, { useState } from 'react';
import IUIToggleProps from './IUIToggleProps';

const UIToggle: React.FC<IUIToggleProps> = ({ projectUIs, taskUIs }) => {
  const [isTaskVisible, setTaskVisible] = useState(true);
  const [isProjectVisible, setProjectVisible] = useState(false);

  const toggleTaskVisibility = () => {
    setProjectVisible(false);
    setTaskVisible(true);
  };

  const toggleProjectVisibility = () => {
    setTaskVisible(false);
    setProjectVisible(true);
  };

  return (
    <>
      <button onClick={toggleTaskVisibility}>{'Task'}</button>
      <button onClick={toggleProjectVisibility}>{'Project'}</button>
      {isTaskVisible && taskUIs}
      {isProjectVisible && projectUIs}
    </>
  );
};

export default UIToggle;

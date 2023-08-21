import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
`;

interface IModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({ onClose, children }) => {
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <div onClick={stopPropagation}>{children}</div>
    </ModalOverlay>
  );
};

export default Modal;

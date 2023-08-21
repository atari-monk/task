import { css } from '@emotion/react';
import styled from '@emotion/styled';

const lightModeVariables = {
  '--background-color': '#f9f9f9',
  '--text-color': '#000',
  '--button-background': '#333',
  '--button-text': '#fff',
};

const darkModeVariables = {
  '--background-color': '#333',
  '--text-color': '#fff',
  '--button-background': '#f9f9f9',
  '--button-text': '#000',
};

export const appContainer = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

export const taskForm = css`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

export const taskList = css`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;

  div {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  h3 {
    margin-top: 0;
  }
`;

export const StyledAppContainer = styled.div`
  ${appContainer}
`;

export const StyledTaskForm = styled.form`
  ${taskForm}
`;

export const StyledTaskList = styled.div`
  ${taskList}
  max-height: 450px; /* Adjust this value as needed to fit 2-3 elements */
  overflow-y: auto; /* This will enable a vertical scrollbar when the content exceeds max-height */
`;

interface IStyledDarkModeToggleProps {
  darkMode: boolean;
}

export const StyledDarkModeToggle = styled.button<IStyledDarkModeToggleProps>`
  background-color: var(--button-background);
  color: var(--button-text);
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
`;

export const setDarkMode = (darkMode: boolean) => {
  const root = document.documentElement;

  if (darkMode) {
    for (const [key, value] of Object.entries(darkModeVariables)) {
      root.style.setProperty(key, value);
    }
  } else {
    for (const [key, value] of Object.entries(lightModeVariables)) {
      root.style.setProperty(key, value);
    }
  }
};

export const StyledAppMenu = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr; /* Three rows: app name, buttons row, and message */
  align-items: center;
  justify-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const AppName = styled.h1`
  font-size: 24px;
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const Message = styled.p`
  margin-top: 20px;
`;

export const StyledProjectForm = styled.form`
  display: flex;
  flex-direction: column;

  input,
  textarea {
    margin-bottom: 10px;
  }
`;

export const StyledProjectList = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;

  div {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  h3 {
    margin-top: 0;
  }
`;

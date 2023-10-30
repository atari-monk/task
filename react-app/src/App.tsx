import React, { useContext, useState } from 'react'
import { StyledAppContainer } from './styles'
import UIToggle from './Layout/UIToggle'
import TaskForm from './Task/TaskForm'
import TaskList from './Task/TaskList'
import ProjectForm from './Project/ProjectForm'
import ProjectList from './Project/ProjectList'
import { AuthContext, appConfig } from 'auth-lib'
import axios from 'axios'
import { AppMenu } from 'ui-lib'

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const [taskListKey, setTaskListKey] = useState(0)

  const handleTaskAdded = () => {
    setTaskListKey((prevKey) => prevKey + 1)
  }

  return (
    <StyledAppContainer className={`App`}>
      <AppMenu config={appConfig} axiosInstance={axios} />
      {isLoggedIn ? (
        <>
          <UIToggle
            taskUIs={
              <>
                <TaskForm config={appConfig} onTaskAdded={handleTaskAdded} />
                <TaskList
                  config={appConfig}
                  key={taskListKey}
                  onTaskAdded={handleTaskAdded}
                />
              </>
            }
            projectUIs={
              <>
                <ProjectForm config={appConfig} />
                <ProjectList config={appConfig} />
              </>
            }
          ></UIToggle>
        </>
      ) : null}
    </StyledAppContainer>
  )
}

export default App

import React, { useContext, useState } from 'react'
import { StyledAppContainer } from './styles'
import { AuthContext } from './Auth/AuthProvider'
import AppMenu from './components/AppMenu'
import UIToggle from './Layout/UIToggle'
import TaskForm from './Task/TaskForm'
import TaskList from './Task/TaskList'
import appConfig from './config/appConfig'
import ProjectForm from './Project/ProjectForm'
import ProjectList from './Project/ProjectList'

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const [taskListKey, setTaskListKey] = useState(0)

  const handleTaskAdded = () => {
    setTaskListKey((prevKey) => prevKey + 1)
  }

  return (
    <StyledAppContainer className={`App`}>
      <AppMenu />
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

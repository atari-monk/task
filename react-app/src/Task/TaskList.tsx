import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StyledTaskList } from '../styles'
import ITask from './ITask'
import ITaskListProps from './ITaskListProps'
import ProjectSelection from '../Project/ProjectSelection'
import IProject from '../Project/IProject'
import TaskPopup from './TaskPopup'
import Modal from '../components/ModalOverlay'
import { extractChars } from '../utils'
import { AuthContext, IAppConfig } from 'auth-lib'

const TaskList: React.FC<ITaskListProps> = ({ config, onTaskAdded }) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const { userId } = useContext(AuthContext)
  const [projects, setProjects] = useState<IProject[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [taskId, setTaskId] = useState('')

  const fetchProjects = async (
    userId: string,
    config: IAppConfig,
    setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
  ) => {
    try {
      console.log('Fetching projects...')
      const response = await axios.get<IProject[]>(
        `${config.apiUrl}/projects/user?userId=${userId}`
      )
      setProjects(response.data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const fetchTasks = async (
    userId: string,
    selectedProjectId: string,
    config: IAppConfig,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
  ) => {
    try {
      console.log('Fetching tasks...')
      console.log('Selected Project ID:', selectedProjectId)
      const response = await axios.get<ITask[]>(
        `${config.apiUrl}/tasks/user/${userId}/${selectedProjectId}`
      )
      setTasks(response.data)
      console.log(`${config.apiUrl}/tasks/user/${userId}/${selectedProjectId}`)
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    }
  }

  useEffect(() => {
    const savedSelectedProjectId = localStorage.getItem('selectedProjectId')
    if (savedSelectedProjectId) {
      setSelectedProjectId(savedSelectedProjectId)
    }
  }, [])

  useEffect(() => {
    console.log('Selected Project ID:', selectedProjectId)
    fetchProjects(userId, config, setProjects)
  }, [config, selectedProjectId, userId, onTaskAdded])

  useEffect(() => {
    if (selectedProjectId) {
      console.log('Fetching tasks...')
      console.log('Selected Project ID:', selectedProjectId)
      fetchTasks(userId, selectedProjectId, config, setTasks)
    }
  }, [config, selectedProjectId, userId])

  const finishTask = async (taskId: string) => {
    try {
      setTaskId(taskId)
      setShowPopup(true)
    } catch (error) {
      console.error('Failed to finish task:', error)
    }
  }

  const handlePopupFinish = async () => {
    setShowPopup(false)

    await fetchTasks(userId, selectedProjectId, config, setTasks)
  }

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId)
    localStorage.setItem('selectedProjectId', projectId)
  }

  const getFrom = (
    localTimestamp: string,
    finishLocalTimestamp: string | undefined
  ): string => {
    if (!finishLocalTimestamp)
      return `${extractChars(localTimestamp, 5, false)} ${extractChars(
        localTimestamp,
        10
      )}`
    const startDate = extractChars(localTimestamp, 10)
    const endDate = extractChars(finishLocalTimestamp, 10)
    return startDate === endDate
      ? extractChars(localTimestamp, 5, false)
      : `${extractChars(localTimestamp, 5, false)} ${extractChars(
          localTimestamp,
          10
        )}`
  }

  const getTo = (finishLocalTimestamp: string | undefined): string => {
    if (!finishLocalTimestamp) return ''
    return `${extractChars(finishLocalTimestamp, 5, false)} ${extractChars(
      finishLocalTimestamp,
      10
    )}`
  }

  return (
    <>
      <ProjectSelection
        projects={projects}
        selectedProjectId={selectedProjectId}
        onChange={handleProjectChange}
      />
      {showPopup && (
        <Modal onClose={() => setShowPopup(false)}>
          <TaskPopup
            config={config}
            taskId={taskId}
            onFinish={handlePopupFinish}
          />
        </Modal>
      )}
      <StyledTaskList>
        {tasks.map((task) => (
          <div key={task._id}>
            <p>
              {`From ${getFrom(
                task.localTimestamp,
                task.finishLocalTimestamp
              )}`}
              {task.finishedAt && ` To ${getTo(task.finishLocalTimestamp)}`}
              {!task.finishedAt && (
                <>
                  <button
                    onClick={() => finishTask(task._id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Finish Task
                  </button>
                </>
              )}
            </p>
            <p>Task: {task.description}</p>
            {task.summary && <p>Summary: {task.summary}</p>}
          </div>
        ))}
      </StyledTaskList>
    </>
  )
}

export default TaskList

import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { StyledTaskForm } from '../styles'
import { AuthContext } from '../Auth/AuthProvider'
import ITaskFormProps from './ITaskFormProps'
import IProject from '../Project/IProject'
import ProjectSelection from '../Project/ProjectSelection'

const TaskForm: React.FC<ITaskFormProps> = ({ config, onTaskAdded }) => {
  const [description, setDescription] = useState('')
  const [projects, setProjects] = useState<IProject[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const { userId } = useContext(AuthContext)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get<IProject[]>(
          `${config.apiUrl}/projects/user?userId=${userId}`
        )
        setProjects(response.data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }
    fetchProjects()
  }, [config.apiUrl, userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${config.apiUrl}/tasks`, {
        description,
        projectId: selectedProjectId,
        userId,
      })
      setDescription('')
      setSelectedProjectId('')
      onTaskAdded()
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  return (
    <StyledTaskForm onSubmit={handleSubmit}>
      <ProjectSelection
        projects={projects}
        selectedProjectId={selectedProjectId}
        onChange={setSelectedProjectId}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Enter task description"
      />
      <button type="submit">Add Task</button>
    </StyledTaskForm>
  )
}

export default TaskForm

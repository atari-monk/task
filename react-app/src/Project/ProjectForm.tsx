import { useContext, useState } from 'react';
import IProjectFormProps from './IProjectFormProps';
import axios from 'axios';
import { StyledProjectForm } from '../styles';
import { AuthContext } from 'auth-lib';

const ProjectForm: React.FC<IProjectFormProps> = ({ config }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { userId } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProject = {
        name,
        description,
        userId,
      };
      await axios.post(`${config.apiUrl}/projects/create`, newProject);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <StyledProjectForm onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Enter project name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Enter project description"
      />
      <button type="submit">Add Project</button>
    </StyledProjectForm>
  );
};

export default ProjectForm;

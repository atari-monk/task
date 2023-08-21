import React from 'react';
import IProjectSelectionProps from './IProjectSelectionProps';

const ProjectSelection: React.FC<IProjectSelectionProps> = ({
  projects,
  selectedProjectId,
  onChange,
}) => {
  return (
    <select
      value={selectedProjectId}
      onChange={(e) => onChange(e.target.value)}
      required
    >
      <option value="">Select a project</option>
      {projects.map((project) => (
        <option key={project._id} value={project._id}>
          {project.name}
        </option>
      ))}
    </select>
  );
};

export default ProjectSelection;

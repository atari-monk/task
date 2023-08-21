import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import IProject from "./IProject";
import IProjectListProps from "./IProjectListProps";
import { StyledProjectList } from "../styles";

const ProjectList: React.FC<IProjectListProps> = ({ config }) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/projects/user?userId=${userId}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, [config.apiUrl, userId]);

  return (
    <StyledProjectList>
      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {/* Add any other project details you want to display */}
          <hr />
        </div>
      ))}
    </StyledProjectList>
  );
};

export default ProjectList;

import IProject from '../Project/IProject';

export default interface IProjectSelectionProps {
  projects: IProject[];
  selectedProjectId: string;
  onChange: (projectId: string) => void;
}

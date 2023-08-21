import IAppConfig from '../config/IAppConfig';

export default interface ITaskPopupProps {
  config: IAppConfig;
  taskId: string;
  onFinish: () => void;
}

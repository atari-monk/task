import { IAppConfig } from "auth-lib";

export default interface ITaskPopupProps {
  config: IAppConfig;
  taskId: string;
  onFinish: () => void;
}

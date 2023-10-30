import { IAppConfig } from "auth-lib"

export default interface ITaskListProps {
  config: IAppConfig
  onTaskAdded: () => void
}

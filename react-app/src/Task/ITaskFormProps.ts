import { IAppConfig } from "auth-lib"

export default interface ITaskFormProps {
  config: IAppConfig
  onTaskAdded: () => void
}

import IAppConfig from '../config/IAppConfig'

export default interface ITaskFormProps {
  config: IAppConfig
  onTaskAdded: () => void
}

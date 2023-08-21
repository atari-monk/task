import IAppConfig from '../config/IAppConfig';

export default interface ILoginGoogleProps {
  config: IAppConfig;
  setMessage: (message: string) => void;
}

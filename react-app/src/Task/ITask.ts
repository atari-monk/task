export default interface ITask {
  _id: string;
  description: string;
  createdAt: Date;
  localTimestamp: string;
  finishedAt?: Date;
  finishLocalTimestamp?: string;
  summary?: string;
}

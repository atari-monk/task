import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  description: string;
  createdAt: Date;
  localTimestamp: string;
  finishedAt?: Date;
  finishLocalTimestamp?: string;
  summary?: string;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
}

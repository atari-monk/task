import { Document, Types } from 'mongoose';

export default interface IProject extends Document {
  name: string;
  description: string;
  createdAt: Date;
  userId: Types.ObjectId;
  isVisible: boolean
}

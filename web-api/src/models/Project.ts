import mongoose, { Schema } from 'mongoose';
import IProject from './IProject';

const typeName = 'Project';

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isVisible: { type: Boolean, required: true, default: true },
});

export const Project = mongoose.model<IProject>(typeName, projectSchema);

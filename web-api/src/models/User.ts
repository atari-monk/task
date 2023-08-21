import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from './IUser';
import validator from 'validator';

const typeName = 'User';

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email format',
    },
  },
  displayName: { type: String, required: true },
  maxRecords: { type: Number, required: true, default: 500 },
});

const User: Model<IUser> = mongoose.model<IUser>(typeName, userSchema);

export default User;

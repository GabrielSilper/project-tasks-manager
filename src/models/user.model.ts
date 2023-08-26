import { Schema, model } from 'mongoose';
import IUser from '../entities/IUser';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;

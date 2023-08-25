import { Types } from 'mongoose';

export default interface ICompany extends Document {
  _id: string;
  name: string;
  users: Types.ObjectId[];
  tasks: Types.ObjectId[];
}

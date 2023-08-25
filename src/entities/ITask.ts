import { Types } from 'mongoose';

export default interface ITask {
  _id: string;
  name: string;
  taskOwner: Types.ObjectId;
  responsibleParties: Types.ObjectId[];
  deliveryDate: Date;
}

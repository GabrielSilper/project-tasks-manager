import { Schema, model } from 'mongoose';
import ITask from '../entities/ITask';

const TaskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    taskOwner: { type: Schema.Types.ObjectId, ref: 'users' },
    responsibleParties: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    deliveryDate: { type: Date, required: true },
    isDone: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const TaskModel = model<ITask>('Task', TaskSchema);

export default TaskModel;

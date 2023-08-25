import { Schema, model } from 'mongoose';
import ITask from '../entities/ITask';

const TaskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  taskOwner: { type: Schema.Types.ObjectId, ref: 'users' },
  responsibleParties: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  deliveryDate: { type: Date, required: true },
});

const TaskModel = model<ITask>('Task', TaskSchema);

export default TaskModel;

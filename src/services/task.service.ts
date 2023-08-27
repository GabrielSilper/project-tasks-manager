import { Types } from 'mongoose';
import ITask, { TaskDTO } from '../entities/ITask';
import ServiceData from '../entities/ServiceData';
import CompanyModel from '../models/company.model';
import TaskModel from '../models/task.model';
import httpStatus from 'http-status';

export default class TaskService {
  constructor(
    private taskModel = TaskModel,
    private companyModel = CompanyModel
  ) {}

  async createTask(
    newTask: TaskDTO,
    taskOwner: string
  ): Promise<ServiceData<ITask>> {
    const task = await this.taskModel.create({
      name: newTask.name,
      taskOwner: taskOwner,
      responsibleParties: [taskOwner, ...newTask.responsibleParties],
      deliveryDate: newTask.deliveryDate,
    });

    await this.companyModel
      .updateOne({ name: 'Workmize' }, { $push: { tasks: task._id } })
      .populate('tasks');
    return { error: null, status: httpStatus.CREATED, data: task };
  }
}

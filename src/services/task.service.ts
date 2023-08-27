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

  async create(
    newTask: TaskDTO,
    taskOwner: string
  ): Promise<ServiceData<ITask>> {
    const task = await this.taskModel.create({
      ...newTask,
      taskOwner,
      responsibleParties: [taskOwner, ...newTask.responsibleParties],
    });

    await this.companyModel.updateOne(
      { name: 'Workmize' },
      { $push: { tasks: task._id } }
    );

    return { error: null, status: httpStatus.CREATED, data: task };
  }

  async getAll(taskOwner: string, role: string): Promise<ServiceData<ITask[]>> {
    let tasks: ITask[];

    if (role === 'admin') {
      tasks = await this.taskModel.find({});
    } else {
      tasks = await this.taskModel.find({ taskOwner });
    }

    return { error: null, status: httpStatus.OK, data: tasks };
  }
}

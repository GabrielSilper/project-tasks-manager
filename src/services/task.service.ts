import { Types } from 'mongoose';
import ITask, { TaskDTO } from '../entities/ITask';
import ServiceData from '../entities/ServiceData';
import { TokenPayload } from '../entities/TokenPayload';
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

  async update(
    user: TokenPayload,
    taskId: string,
    task: TaskDTO
  ): Promise<ServiceData<ITask>> {
    const taskToUpdate = await this.taskModel.findById(taskId);

    if (!taskToUpdate) {
      return {
        error: 'TASK_NOT_FOUND',
        status: httpStatus.NOT_FOUND,
        data: { message: 'Task not found' },
      };
    }

    const idObject = new Types.ObjectId(user._id);

    if (user.role === 'admin' || taskToUpdate.taskOwner == idObject) {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        {
          $set: {
            deliveryDate: task.deliveryDate,
            name: task.name,
            responsibleParties: task.responsibleParties,
          },
        },
        { new: true }
      );

      return { error: null, status: httpStatus.OK, data: updatedTask as ITask };
    }

    return {
      error: 'TASK_UNAUTHORIZED',
      status: httpStatus.UNAUTHORIZED,
      data: { message: 'You are not allowed to update this task' },
    };
  }
}

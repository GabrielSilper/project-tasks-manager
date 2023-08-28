import { Types } from 'mongoose';
import ITask, { TaskDTO } from '../entities/ITask';
import ServiceData from '../entities/ServiceData';
import { TokenPayload } from '../entities/TokenPayload';
import CompanyModel from '../models/company.model';
import TaskModel from '../models/task.model';
import httpStatus from 'http-status';
import { TASK_NOT_FOUND, TASK_UNAUTHORIZED } from '../entities/ReturnsTypes';

export default class TaskService {
  constructor(
    private taskModel = TaskModel,
    private companyModel = CompanyModel
  ) {}

  private async checkTaskBeforeAction(
    taskId: string,
    user: TokenPayload
  ): Promise<number> {
    const taskToUpdate = await this.taskModel.findById(taskId);
    if (!taskToUpdate) return 0;

    const idObject = new Types.ObjectId(user._id);
    if (user.role === 'admin' || taskToUpdate.taskOwner == idObject) return 1;

    return 2;
  }

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
    const typeAction = await this.checkTaskBeforeAction(taskId, user);

    if (!typeAction) return TASK_NOT_FOUND;

    if (typeAction === 1) {
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

    return TASK_UNAUTHORIZED;
  }
}

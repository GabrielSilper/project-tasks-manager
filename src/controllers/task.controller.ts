import { TokenPayload } from '../entities/TokenPayload';
import TaskService from '../services/task.service';
import { Request, Response } from 'express';

export default class TaskController {
  constructor(private taskService = new TaskService()) {}

  async create(req: Request & { user: TokenPayload }, res: Response) {
    const { body } = req;
    const { _id } = req.user;

    const { status, data } = await this.taskService.createTask(body, _id);
    res.status(status).json(data);
  }
}

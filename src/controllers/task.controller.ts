import { RequestWithUser, TokenPayload } from '../entities/TokenPayload';
import TaskService from '../services/task.service';
import { Request, Response } from 'express';
import TokenJwt from '../utils/TokenJwt';
import TokenFunctions from '../entities/TokenFunctions';

export default class TaskController {
  constructor(
    private taskService = new TaskService(),
    private token: TokenFunctions = new TokenJwt()
  ) {}

  async create(req: RequestWithUser, res: Response) {
    const { body } = req;
    const { _id } = req.user;

    const { status, data } = await this.taskService.create(body, _id);
    res.status(status).json(data);
  }

  async getAll(req: RequestWithUser, res: Response) {
    const { _id, role } = req.user;

    const { status, data } = await this.taskService.getAll(_id, role);
    res.status(status).json(data);
  }

  async update(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;

    const user: TokenPayload = this.token.verifyToken(
      req.headers.authorization as string
    );

    const { status, data } = await this.taskService.update(user, id, body);
    res.status(status).json(data);
  }

  async finishTask(req: Request, res: Response) {
    const { id } = req.params;

    const user: TokenPayload = this.token.verifyToken(
      req.headers.authorization as string
    );

    const { status, data } = await this.taskService.finishTask(user, id);
    res.status(status).json(data);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;

    const user: TokenPayload = this.token.verifyToken(
      req.headers.authorization as string
    );

    const { status, data } = await this.taskService.remove(user, id);
    res.status(status).json(data);
  }
}

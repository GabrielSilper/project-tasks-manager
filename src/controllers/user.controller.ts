import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const { status, data } = await this.userService.create(body);
    res.status(status).json(data);
  }
}

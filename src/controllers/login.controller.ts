import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { body } = req;
    const { status, data } = await this.loginService.login(body);
    return res.status(status).json(data);
  }
}

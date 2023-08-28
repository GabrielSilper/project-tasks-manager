import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  static async fields(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).send({
        message: 'Missing required fields',
      });
    }

    if (role !== 'admin' && role !== 'user') {
      return res.status(422).send({
        message: 'Invalid role, must be "admin" or "user"',
      });
    }

    next();
  }
}

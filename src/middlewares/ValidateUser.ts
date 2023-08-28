import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export default class ValidateUser {
  static fields(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { name, password, image, email, role } = body;
    if (!name || !password || !image || !email || !role) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'Missing required fields',
      });
    }
    if (role !== 'admin' && role !== 'user') {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
        message: 'Invalid role, must be "admin" or "user"',
      });
    }
    return next();
  }
}

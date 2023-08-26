import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

export default class ErrorMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Something went wrong',
      err,
    });
  }
}

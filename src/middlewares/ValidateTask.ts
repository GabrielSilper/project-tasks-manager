import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export default class ValidateTask {
  static fields(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { name, responsibleParties, deliveryDate } = body;
    if (!name || !responsibleParties || !deliveryDate) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Missing required fields',
      });
    }
    if (responsibleParties.length < 1) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Must have at least one responsible party',
      });
    }
    return next();
  }
}

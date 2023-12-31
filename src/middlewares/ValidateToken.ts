import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { RequestWithUser } from '../entities/TokenPayload';
import TokenJwt from '../utils/TokenJwt';
import TokenFunctions from '../entities/TokenFunctions';

export default class ValidateToken {
  private static tokenFunctions: TokenFunctions = new TokenJwt();

  static handle(req: RequestWithUser, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }

    try {
      req.user = this.tokenFunctions.verifyToken(authorization);
    } catch (error) {
      const message = 'Token must be a valid token';
      return res.status(httpStatus.UNAUTHORIZED).json({ message });
    }

    next();
  }

  static handleWithoutUser(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }

    try {
      this.tokenFunctions.verifyToken(authorization);
    } catch (error) {
      const message = 'Token must be a valid token';
      return res.status(httpStatus.UNAUTHORIZED).json({ message });
    }

    next();
  }
}

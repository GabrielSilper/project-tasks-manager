import { Request } from 'express';

export type TokenPayload = {
  _id: string;
  role: string;
  email: string;
};

export type UserPayload = {
  user: TokenPayload;
};

export type RequestWithUser = Request & UserPayload;

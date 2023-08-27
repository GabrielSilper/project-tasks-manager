import { Request, Router } from 'express';
import TaskController from '../controllers/task.controller';
import { TokenPayload } from '../entities/TokenPayload';
import ValidateToken from '../middlewares/ValidateToken';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post(
  '/',
  (req, res, next) =>
    ValidateToken.handle(req as Request & { user: TokenPayload }, res, next),
  (req, res) =>
    taskController.create(req as Request & { user: TokenPayload }, res)
);

export default taskRoutes;

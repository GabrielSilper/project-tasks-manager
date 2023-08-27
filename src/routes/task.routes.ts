import { Request, Router } from 'express';
import TaskController from '../controllers/task.controller';
import { RequestWithUser, TokenPayload } from '../entities/TokenPayload';
import ValidateToken from '../middlewares/ValidateToken';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post(
  '/',
  (req, res, next) => ValidateToken.handle(req as RequestWithUser, res, next),
  (req, res) => taskController.create(req as RequestWithUser, res)
);

taskRoutes.get(
  '/',
  (req, res, next) => ValidateToken.handle(req as RequestWithUser, res, next),
  (req, res) => taskController.getAll(req as RequestWithUser, res)
);

taskRoutes.put(
  '/:id',
  (req, res, next) => ValidateToken.handleWithoutUser(req, res, next),
  (req, res) => taskController.update(req, res)
);

export default taskRoutes;

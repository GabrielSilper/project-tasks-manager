import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import { RequestWithUser } from '../entities/TokenPayload';
import ValidateToken from '../middlewares/ValidateToken';
import ValidateTask from '../middlewares/ValidateTask';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post(
  '/',
  (req, res, next) => ValidateTask.fields(req, res, next),
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

taskRoutes.patch(
  '/:id/finish',
  (req, res, next) => ValidateToken.handleWithoutUser(req, res, next),
  (req, res) => taskController.finishTask(req, res)
);

taskRoutes.delete(
  '/:id',
  (req, res, next) => ValidateToken.handleWithoutUser(req, res, next),
  (req, res) => taskController.remove(req, res)
);

export default taskRoutes;

import express from 'express';
import UserController from '../controllers/user.controller';
import ValidateUSer from '../middlewares/ValidateUser';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post(
  '/',
  (req, res, next) => ValidateUSer.fields(req, res, next),
  (req, res) => userController.create(req, res)
);

export default userRouter;

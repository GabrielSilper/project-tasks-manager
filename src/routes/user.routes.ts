import express from 'express';
import UserController from '../controllers/user.controller';
import ValidateUser from '../middlewares/ValidateUser';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post(
  '/',
  (req, res, next) => ValidateUser.fields(req, res, next),
  (req, res) => userController.create(req, res),
);

export default userRoutes;

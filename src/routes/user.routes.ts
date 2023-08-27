import express from 'express';
import UserController from '../controllers/user.controller';
import ValidateUSer from '../middlewares/ValidateUser';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post(
  '/',
  (req, res, next) => ValidateUSer.fields(req, res, next),
  (req, res) => userController.create(req, res)
);

export default userRoutes;

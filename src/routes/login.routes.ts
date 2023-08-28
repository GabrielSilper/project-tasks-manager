import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import ValidateLogin from '../middlewares/ValidateLogin';

const loginRoutes = Router();
const loginController = new LoginController();

loginRoutes.post(
  '/',
  (req, res, next) => ValidateLogin.fields(req, res, next),
  (req, res) => loginController.login(req, res),
);

export default loginRoutes;

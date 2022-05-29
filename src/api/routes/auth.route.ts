import { Router } from 'express';
import AuthController from '@/api/controllers/auth.controller';
import { CreateUserDto } from '@/apps/user/users.dto';
import { Routes } from './routes.interface';
import authMiddleware from '@/api/middlewares/auth.middleware';
import validationMiddleware from '@/api/middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;

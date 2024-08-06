import { AuthController } from '@/controllers/auth.controller';
import { SampleController } from '@/controllers/sample.controller';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.register);
  }

  getRouter(): Router {
    return this.router;
  }
}

//URUTAN PEMBUATAN SUATU ENDPOINT
//1. SERVICE
//2. Controller
//3. Router
//4. App/Index

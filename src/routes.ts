import { Router } from 'express';

import UsersController from './app/controllers/UsersController';
import LoginController from './app/controllers/LoginController';
import authMiddleware from './app/middlewares/authMiddleware';

const routes = Router();

routes.post('/users', UsersController.store);
routes.get('/user', authMiddleware, UsersController.details);

routes.post('/login', LoginController.index);

export default routes;
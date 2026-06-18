import { Router } from 'express';
import { UserController } from './UserController.js';

export const userRoutes = Router();
const controller = new UserController();

userRoutes.get('/', controller.index.bind(controller));
userRoutes.get('/:id', controller.show.bind(controller));
userRoutes.post('/', controller.store.bind(controller));
userRoutes.put('/:id', controller.update.bind(controller));
userRoutes.delete('/:id', controller.delete.bind(controller));
userRoutes.post('/login', controller.login.bind(controller));
import { Router } from 'express';
import { CartItemController } from './CartItemController.js';

export const cartItemRoutes = Router();
const controller = new CartItemController();

cartItemRoutes.get('/user/:user_id', controller.index.bind(controller));
cartItemRoutes.get('/:id', controller.show.bind(controller));
cartItemRoutes.post('/', controller.store.bind(controller));
cartItemRoutes.put('/:id', controller.update.bind(controller));
cartItemRoutes.delete('/:id', controller.delete.bind(controller));
import { Router } from 'express';
import { OrderController } from './OrderController.js';

export const orderRoutes = Router();
const controller = new OrderController();

orderRoutes.get('/user/:userId', controller.index.bind(controller));
orderRoutes.get('/:id', controller.show.bind(controller));
orderRoutes.post('/', controller.store.bind(controller));
orderRoutes.put('/:id', controller.update.bind(controller));
orderRoutes.delete('/:id', controller.delete.bind(controller));
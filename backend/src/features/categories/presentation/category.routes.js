import { Router } from 'express';
import { CategoryController } from './CategoryController.js';

export const categoryRoutes = Router();
const controller = new CategoryController();

categoryRoutes.get('/', controller.index.bind(controller));
categoryRoutes.get('/:id', controller.show.bind(controller));
categoryRoutes.post('/', controller.store.bind(controller));
categoryRoutes.put('/:id', controller.update.bind(controller));
categoryRoutes.delete('/:id', controller.delete.bind(controller));
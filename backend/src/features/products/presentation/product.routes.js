import { Router } from 'express';
import { ProductController } from './ProductController.js';

export const productRoutes = Router();
const controller = new ProductController();

productRoutes.get('/', controller.index.bind(controller));
productRoutes.get('/:id', controller.show.bind(controller));
productRoutes.post('/', controller.store.bind(controller));
productRoutes.put('/:id', controller.update.bind(controller));
productRoutes.delete('/:id', controller.delete.bind(controller));
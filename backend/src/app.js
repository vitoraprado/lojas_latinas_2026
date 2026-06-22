import cors from 'cors';
import express from 'express';
import { userRoutes } from './features/users/presentation/user.routes.js';
import { productRoutes } from './features/products/presentation/product.routes.js';
import { categoryRoutes } from './features/categories/presentation/category.routes.js';
import { cartItemRoutes } from './features/cart_items/presentation/cartitem.routes.js';
import { orderRoutes } from './features/orders/presentation/order.routes.js';
import { errorHandler } from './shared/http/errorHandler.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (request, response) => {
  response.json({ success: true, message: 'API online' });
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart_items', cartItemRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);
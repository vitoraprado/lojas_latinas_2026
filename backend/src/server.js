import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import oracledb from 'oracledb';
import {wrap} from './middleware/errorHandler.js';
import {query} from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const dbClient = (process.env.DB_CLIENT || 'mysql').toLowerCase();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Type'],
}));
app.options('*', cors());
app.use(express.json());

app.get('/api/health', wrap(async (_, res) => {
  const sql = dbClient === 'oracle'
    ? 'SELECT COUNT(*) AS TOTAL FROM categories'
    : 'SELECT COUNT(*) AS TOTAL FROM categories';
  const result = await query(sql);
  const row = result.rows[0] || {};
  res.json({
    STATUS: 'ok',
    DB_CLIENT: dbClient,
    CATEGORIES: row.TOTAL ?? 0,
  });
}));

import categoryRoutes from './routes/category.routes.js';

app.use('/api/categories', categoryRoutes);

import productRoutes from './routes/product.routes.js';

app.use('/api/products', productRoutes);

app.listen(port, '0.0.0.0', () => console.log(`Backend Node rodando na porta ${port}`));

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import oracledb from 'oracledb';

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

let mysqlPool = null;

function upperCaseKeys(value) {
  if (Array.isArray(value)) return value.map(upperCaseKeys);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key.toUpperCase(), upperCaseKeys(item)]));
}

function bodyValue(body, field) {
  return body?.[field] ?? body?.[field.toUpperCase()];
}

function normalizeRows(rows) {
  return (rows || []).map((row) => upperCaseKeys(row));
}

async function query(sql, params = []) {
  if (dbClient === 'oracle') {
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    });
    try {
      const result = await conn.execute(sql, params, { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
      return { rows: normalizeRows(result.rows) };
    } finally {
      await conn.close();
    }
  }

  const pool = await getMysqlPool();
  const [rows] = await pool.query(sql, params);
  return { rows: normalizeRows(rows) };
}

function wrap(handler) {
  return (req, res) => Promise.resolve(handler(req, res)).catch((err) => {
    console.error(err);
    res.status(500).json({ ERROR: 'Internal error', DETAILS: String(err.message || err) });
  });
}

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

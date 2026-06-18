import cors from 'cors';
import express from 'express';
import mysql from 'mysql2/promise';
import oracledb from 'oracledb';
import { wrap } from './shared/http/errorHandler.js';
import { query } from './shared/database/database.js';
import { app } from './app.js'; 

const dbClient = (process.env.DB_CLIENT || 'mysql').toLowerCase();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Type'],
}));
app.options('*', cors());

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

const port = Number(process.env.PORT || 8000);

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
import mysql from 'mysql2/promise';
import {normalizeRows} from '../utils/object.utils.js';

const dbClient = (process.env.DB_CLIENT || 'mysql').toLowerCase();

let mysqlPool = null;

export async function getMysqlPool() {
  if (!mysqlPool) {
    mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'labuser',
      password: process.env.DB_PASSWORD || 'labpass',
      database: process.env.DB_NAME || 'labdb',
      charset: 'utf8mb4',
    });
  }
  return mysqlPool;
}

export async function query(sql, params = []) {
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
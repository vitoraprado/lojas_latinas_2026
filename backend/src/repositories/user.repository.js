import { getMysqlPool } from '../config/database.js';

export async function findByEmail(email) {
  const pool = await getMysqlPool();

  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  return rows[0];
}
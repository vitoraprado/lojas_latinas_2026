import { getMysqlPool } from '../config/database.js';

export async function findAll() {
  const pool = await getMysqlPool();

  const [rows] = await pool.query(
    'SELECT id, name, description FROM categories ORDER BY id'
  );

  return rows;
}

export async function findById(id) {
  const pool = await getMysqlPool();

  const [rows] = await pool.query(
    'SELECT id, name, description FROM categories WHERE id = ?',
    [id]
  );

  return rows[0];
}

export async function create(name, description) {
  const pool = await getMysqlPool();

  const [result] = await pool.query(
    'INSERT INTO categories(name, description) VALUES (?, ?)',
    [name, description]
  );

  return result.insertId;
}

export async function update(id, name, description) {
  const pool = await getMysqlPool();

  await pool.query(
    'UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
}

export async function remove(id) {
  const pool = await getMysqlPool();

  await pool.query(
    'DELETE FROM categories WHERE id = ?',
    [id]
  );
}
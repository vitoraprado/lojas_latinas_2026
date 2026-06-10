import { getMysqlPool } from '../config/database.js';

export async function findAll() {
  const pool = await getMysqlPool();

  const [rows] = await pool.query(
    'SELECT p.id, p.category_id, p.name, p.price, p.stock, c.name AS category_name FROM products p JOIN categories c ON c.id = p.category_id ORDER BY p.id'
  );

  return rows;
}

export async function findById(id) {
  const pool = await getMysqlPool();

  const [rows] = await pool.query(
    'SELECT p.id, p.category_id, p.name, p.price, p.stock, c.name AS category_name FROM products p JOIN categories c ON c.id = p.category_id WHERE p.id = ?',
    [id]
  );

  return rows[0];
}

export async function create(name, category_id, price, stock) {
  const pool = await getMysqlPool();

  const [result] = await pool.query(
    'INSERT INTO products(name, category_id, price, stock) VALUES (?, ?, ?, ?)',
    [name, category_id, price, stock]
  );

  return result.insertId;
}

export async function update(id, name, category_id, price, stock) {
  const pool = await getMysqlPool();

  await pool.query(
    'UPDATE products SET name = ?, category_id = ?, price = ?, stock = ? WHERE id = ?',
    [name, category_id, price, stock, id]
  );
}

export async function remove(id) {
  const pool = await getMysqlPool();

  await pool.query(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
}
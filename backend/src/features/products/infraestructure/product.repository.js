import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    category_id: row.category_id,
    name: row.name,
    stock: row.stock,
    price: row.price,
  };
}

export class ProductRepository {
  async findAll() {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, category_id, name, price, stock FROM products ORDER BY id'
    );

    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, category_id, name, price, stock FROM products WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async create(category_id, name, price, stock) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO products(category_id, name, price, stock) VALUES (?, ?, ?, ?)',
      [category_id, name, price, stock]
    );

    return result.insertId;
  }

  async update(id, category_id, name, price, stock) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE products SET category_id = ?, name = ?, price = ?, stock = ? WHERE id = ?',
      [category_id, name, price, stock, id]
    );
  }

  async remove(id) {
    const pool = await getMysqlPool();

    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
  }
}
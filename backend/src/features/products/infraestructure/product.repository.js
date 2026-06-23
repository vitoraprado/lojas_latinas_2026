import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    category_id: row.category_id,
    category_name: row.category_name,
    name: row.name,
    stock: row.stock,
    price: row.price,
  };
}

export class ProductRepository {
  async findAll(filters = {}) {
    const pool = await getMysqlPool();

    let query = `
      SELECT p.id, p.category_id, c.name as category_name, p.name, p.price, p.stock 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    if (filters.category_id) {
      query += " AND p.category_id = ?";
      params.push(filters.category_id);
    }

    if (filters.search) {
      query += " AND p.name LIKE ?";
      params.push(`%${filters.search}%`);
    }
    
    const [rows] = await pool.query(query, params);
    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT p.id, p.category_id, c.name as category_name, p.name, p.price, p.stock FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
      [id]
    );

    return rows[0];
  }

  async create(product) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO products(category_id, name, price, stock) VALUES (?, ?, ?, ?)',
      [product.category_id, product.name, product.price, product.stock]
    );

    return result.insertId;
  }

  async update(id, product) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE products SET category_id = ?, name = ?, price = ?, stock = ? WHERE id = ?',
      [product.category_id, product.name, product.price, product.stock, id]
    );
  }

  async remove(id) {
    const pool = await getMysqlPool();

    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
  }

  async incrementStock(id, quantity) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE products SET stock = stock + ? WHERE id = ?',
      [quantity, id]
    );
  }
}
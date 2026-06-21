import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    product_id: row.product_id,
    description: row.description
  };
}

export class CartItemRepository {
  async findByUserId(userId) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price' + 
      'FROM cart_items ci' +
      'JOIN products p ON ci.product_id = p.id' +
      'WHERE ci.user_id = ?',
      [userId]
    );

    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, user_id, product_id, description FROM cart_items WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async create(user_id, product_id, description) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO cart_items(user_id, product_id, description) VALUES (?, ?, ?)',
      [user_id, product_id, description]
    );

    return result.insertId;
  }

  async update(id, user_id, product_id, description) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE cart_items SET user_id = ?, product_id = ?, description = ? WHERE id = ?',
      [user_id, product_id, description, id]
    );
  }

  async remove(id) {
    const pool = await getMysqlPool();

    await pool.query(
      'DELETE FROM cart_items WHERE id = ?',
      [id]
    );
  }
}
import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    product_id: row.product_id,
    quantity: row.quantity
  };
}

export class CartItemRepository {
  async findByUserId(userId) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price ' + 
      'FROM items_cart ci ' +
      'JOIN products p ON ci.product_id = p.id ' +
      'WHERE ci.user_id = ?',
      [userId]
    );

    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, user_id, product_id, quantity FROM items_cart WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async create(cartItem) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO items_cart(user_id, product_id, quantity) VALUES (?, ?, ?)',
      [cartItem.user_id, cartItem.product_id, cartItem.quantity]
    );

    return result.insertId;
  }

  async update(id, user_id, product_id, quantity) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE items_cart SET user_id = ?, product_id = ?, quantity = ? WHERE id = ?',
      [user_id, product_id, quantity, id]
    );
  }

  async delete(id) {
    const pool = await getMysqlPool();

    await pool.query(
      'DELETE FROM items_cart WHERE id = ?',
      [id]
    );
  }
}
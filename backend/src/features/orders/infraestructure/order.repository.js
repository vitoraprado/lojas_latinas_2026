import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    order_date: row.order_date,
    status: row.status
  };
}

export class OrderRepository {
  async findByUserId(userId) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      `SELECT o.id, o.user_id, o.order_date, o.status 
       FROM orders o 
       WHERE o.user_id = ?`,
      [userId]
    );

    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      `SELECT o.id, o.user_id, o.order_date, o.status 
       FROM orders o 
       WHERE o.id = ?`,
      [id]
    );

    return rows[0];
  }

  async create(order) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO orders(user_id, order_date, status) VALUES (?, NOW(), ?)',
      [order.user_id, order.status]
    );

    return result.insertId;
  }

  async createItem(item) {
    const pool = await getMysqlPool();

    await pool.query(
      'INSERT INTO items_order(order_id, product_id, quantity) VALUES (?, ?, ?)',
      [item.order_id, item.product_id, item.quantity]
    );
  }

  async findItemsByOrderId(orderId) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, p.name as name, p.price as price
       FROM items_order oi 
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    return rows;
  }

  async changeStatus(id, status) {
    const pool = await getMysqlPool();

    await pool.query(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, id]
    );
  }

  async listAll() {
    const pool = await getMysqlPool();
    const [rows] = await pool.query(
      `SELECT o.id, o.user_id, o.order_date, o.status, u.name as user_name
       FROM orders o
       JOIN users u ON o.user_id = u.id`
    );
    return rows;
  }
}
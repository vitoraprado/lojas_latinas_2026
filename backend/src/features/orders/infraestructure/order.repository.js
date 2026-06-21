import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    order_date: row.order_date,
    status: row.status // 1 - Pendente, 2 - Enviado, 3 - Entregue, 4 - Cancelado
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

  async create(user_id, order_date, status) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO orders(user_id, order_date, status) VALUES (?, ?, ?)',
      [user_id, order_date, status]
    );

    return result.insertId;
  }

  async update(id, user_id, order_date, status) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE orders SET user_id = ?, order_date = ?, status = ? WHERE id = ?',
      [user_id, order_date, status, id]
    );
  }

  async findItemsByOrderId(orderId) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity 
       FROM order_items oi 
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
}
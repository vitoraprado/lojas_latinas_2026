import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    user_type: row.user_type,
    email: row.email,
    password: row.password
  };
}

export class UserRepository {
  async findAll() {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, name, user_type, email, password FROM users ORDER BY id'
    );

    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, name, user_type, email, password FROM users WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async findByEmail(email) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, name, user_type, email, password FROM users WHERE email = ?',
      [email]
    );

    return rows[0];
  }

  async create(user) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO users(name, user_type, email, password) VALUES (?, ?, ?, ?)',
      [user.name, user.user_type, user.email, user.password]
    );

    return result.insertId;
  }

  async update(id, user) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE users SET name = ?, user_type = ?, email = ?, password = ? WHERE id = ?',
      [user.name, user.user_type, user.email, user.password, id]
    );
  }

  async remove(id) {
    const pool = await getMysqlPool();

    await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
  }
}
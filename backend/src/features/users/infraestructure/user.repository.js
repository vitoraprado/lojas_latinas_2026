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

  async create(name, user_type, email, password) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO users(name, user_type, email, password) VALUES (?, ?, ?, ?)',
      [name, user_type, email, password]
    );

    return result.insertId;
  }

  async update(id, name, user_type, email, password) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE users SET name = ?, user_type = ?, email = ?, password = ? WHERE id = ?',
      [name, user_type, email, password, id]
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
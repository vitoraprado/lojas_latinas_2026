import { getMysqlPool } from '../../../shared/database/database.js';

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description
  };
}

export class CategoryRepository {
  async findAll() {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, name, description FROM categories ORDER BY id'
    );

    return rows;
  }

  async findById(id) {
    const pool = await getMysqlPool();

    const [rows] = await pool.query(
      'SELECT id, name, description FROM categories WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async create(name, description) {
    const pool = await getMysqlPool();

    const [result] = await pool.query(
      'INSERT INTO categories(name, description) VALUES (?, ?)',
      [name, description]
    );

    return result.insertId;
  }

  async update(id, name, description) {
    const pool = await getMysqlPool();

    await pool.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
  }

  async remove(id) {
    const pool = await getMysqlPool();

    await pool.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
  }
}
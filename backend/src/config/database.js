import mysql from 'mysql2/promise';

let mysqlPool = null;

async function getMysqlPool() {
  if (!mysqlPool) {
    mysqlPool = mysql.createPool({
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'labuser',
      password: process.env.DB_PASSWORD || 'labpass',
      database: process.env.DB_NAME || 'labdb',
      charset: 'utf8mb4',
    });
  }
  return mysqlPool;
}

export { getMysqlPool };
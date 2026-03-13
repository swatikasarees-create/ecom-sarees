import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | null = null;
let tableReadyPromise: Promise<void> | null = null;

const required = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const getDbPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: required('MYSQL_HOST'),
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: required('MYSQL_USER'),
      password: required('MYSQL_PASSWORD'),
      database: required('MYSQL_DATABASE'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

export const ensureProductsTable = async () => {
  if (!tableReadyPromise) {
    tableReadyPromise = (async () => {
      const db = getDbPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS products (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(120) NOT NULL,
          inventory INT NOT NULL DEFAULT 0,
          price DECIMAL(10,2) NOT NULL,
          image_url TEXT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    })();
  }
  await tableReadyPromise;
};

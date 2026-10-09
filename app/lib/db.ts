import mysql, { type Pool } from 'mysql2/promise';

let pool: Pool | null = null;
let tableReadyPromise: Promise<void> | null = null;
let ordersTableReadyPromise: Promise<void> | null = null;

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
      host: required('MYSQL_HOST').trim(),
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: required('MYSQL_USER').trim(),
      password: required('MYSQL_PASSWORD'),
      database: required('MYSQL_DATABASE').trim(),
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
          fabric VARCHAR(100) NULL,
          color VARCHAR(100) NULL,
          collection VARCHAR(100) NULL,
          inventory INT NOT NULL DEFAULT 0,
          price DECIMAL(10,2) NOT NULL,
          original_price DECIMAL(10,2) NULL,
          image_url TEXT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      // Ensure extra columns exist on legacy tables
      const columnsToAdd = [
        { name: 'fabric', type: 'VARCHAR(100) NULL' },
        { name: 'color', type: 'VARCHAR(100) NULL' },
        { name: 'collection', type: 'VARCHAR(100) NULL' },
        { name: 'original_price', type: 'DECIMAL(10,2) NULL' },
      ];
      for (const col of columnsToAdd) {
        try {
          await db.query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
        } catch {
          // column already exists, ignore error
        }
      }
    })();
  }
  await tableReadyPromise;
};

export const ensureOrdersTables = async () => {
  if (!ordersTableReadyPromise) {
    ordersTableReadyPromise = (async () => {
      const db = getDbPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          order_id VARCHAR(40) NOT NULL UNIQUE,
          customer_name VARCHAR(180) NOT NULL,
          customer_phone VARCHAR(20) NOT NULL,
          customer_email VARCHAR(255) NULL,
          address_line1 VARCHAR(255) NOT NULL,
          address_line2 VARCHAR(255) NULL,
          city VARCHAR(120) NOT NULL,
          state_name VARCHAR(120) NOT NULL,
          pincode VARCHAR(12) NOT NULL,
          notes TEXT NULL,
          payment_mode ENUM('COD', 'RAZORPAY') NOT NULL,
          payment_id VARCHAR(120) NULL,
          amount DECIMAL(10,2) NOT NULL,
          status ENUM('PLACED', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS order_items (
          id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          order_id BIGINT NOT NULL,
          product_id VARCHAR(64) NOT NULL,
          product_name VARCHAR(255) NOT NULL,
          unit_price DECIMAL(10,2) NOT NULL,
          quantity INT NOT NULL,
          line_total DECIMAL(10,2) NOT NULL,
          image_url TEXT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_order_items_order_id
            FOREIGN KEY (order_id) REFERENCES orders(id)
            ON DELETE CASCADE
        )
      `);
    })();
  }
  await ordersTableReadyPromise;
};

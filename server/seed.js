import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS chalet_photos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url TEXT NOT NULL
      );
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS chalet_bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        pib VARCHAR(255) NULL,
        phone VARCHAR(50) NULL,
        comment TEXT NULL,
        status ENUM('pending', 'confirmed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query('INSERT IGNORE INTO chalet_photos (id, url) VALUES (999, "http://localhost:5173/images/1.jpg")');

    await connection.end();
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error(err.message);
  }
}

seedDB();
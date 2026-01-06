import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool for better performance and VPS compatibility
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Validate required environment variables
if (!process.env.DB_NAME) {
  console.error('❌ Error: DB_NAME environment variable is required');
  console.error('❌ Please set DB_NAME in your .env file');
  process.exit(1);
}

// Test connection and handle errors gracefully
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    console.error('❌ Please check your database configuration in .env file');
    // Don't exit in production to allow PM2 to restart
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  });

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
  });

export default pool;


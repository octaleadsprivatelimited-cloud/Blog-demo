import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'health_cooking_blog',
  multipleStatements: true
});

try {
  console.log('📝 Reading demo blogs SQL file...');
  const sqlFile = path.join(__dirname, '..', 'database', 'demo-blogs.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');
  
  console.log('🚀 Inserting demo blogs into database...');
  await connection.query(sql);
  
  console.log('✅ Demo blogs inserted successfully!');
  console.log('📚 You should now see 6 demo blog posts on your website.');
  
  // Show what was inserted
  const [blogs] = await connection.query(
    `SELECT id, title, status FROM blogs ORDER BY created_at DESC LIMIT 6`
  );
  
  console.log('\n📖 Inserted blogs:');
  blogs.forEach(blog => {
    console.log(`   - ${blog.title} (${blog.status})`);
  });
  
} catch (error) {
  console.error('❌ Error inserting demo blogs:', error.message);
  if (error.code === 'ER_DUP_ENTRY') {
    console.log('\n⚠️  Some blogs may already exist. The script attempted to insert all demo blogs.');
  }
} finally {
  await connection.end();
}


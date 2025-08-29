
import mysql from "mysql2";
import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

console.log('Connection successful');
export default pool.promise(); 
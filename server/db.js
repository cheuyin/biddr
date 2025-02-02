import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from 'pg';
const { Pool, Client } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({
  override: true,
  path: path.join(__dirname, '.env.development'),
});

let pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  idleTimeoutMillis: 20000,
});

pool.on('error', (error) => {
  console.error('Pool connection error:', error);
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    idleTimeoutMillis: 20000,
  });
});

// Help from: https://github.com/brianc/node-postgres/issues/2112#issuecomment-591027787
export default async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.log('Error in query() in db.js: ', error);
    throw error;
  } finally {
    client.release();
  }
}

// This instance of the query function returns the entire response, not just the rows
export const rawQuery = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.log('Error in rawQuery() in db.js: ', error);
    throw error;
  } finally {
    client.release();
  }
};

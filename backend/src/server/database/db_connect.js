import pg from "pg";

const { Pool } = pg;
// Configuración en .env
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true,
  // ssl: true,
};

const pool = new Pool(config);

const db = async (query, values) => {
  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("db_connect => db", error);
    throw error;
  }
};

export default db;

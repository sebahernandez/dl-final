import db from "../database/db_connect.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ name, email, password }) => {
  const query =
    "INSERT INTO users (email, password, name, registerdate) VALUES ($1, $2, $3, $4) RETURNING *";

  const hashedPassword = bcrypt.hashSync(password);
  const currentDate = new Date();

  const result = await db(query, [email, hashedPassword, name, currentDate]);

  return result.rows;
};

import db from "../database/db_connect.js";
import bcrypt from "bcryptjs";

export const setUser = async ({ email, password, role = "user", name }) => {
  const query =
    "INSERT INTO users (email, password, role, name ) VALUES ( $1, $2, $3, $4 )"; // se evita retornar el mensaje para no exponer la clave.
  password = bcrypt.hashSync(password); // se hashea antes de guardar.
  await db(query, [email, password, role, name]);
};

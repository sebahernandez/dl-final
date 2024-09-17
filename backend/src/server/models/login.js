import db from "../database/db_connect.js";
import bcrypt from "bcryptjs";

export const validateUser = async ({ email, password }) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const {
      rows: [user],
    } = await db(query, [email]);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      throw new Error("Usuario o contraseña incorrecto");
    }

    delete user.password;
    return user;
  } catch (error) {
    throw new Error(error.message || "Error validating user");
  }
};

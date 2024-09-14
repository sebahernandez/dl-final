import db from "../database/db_connect.js";
import bcrypt from "bcryptjs";

export const validateUser = async ({ email, password }) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const {
    rows: [user],
  } = await db(query, [email]);
  const validate = await bcrypt.compare(password, user.password);
  if (!validate) {
    throw "Wrong password or email";
  }
  delete user.password;
  return user;
};

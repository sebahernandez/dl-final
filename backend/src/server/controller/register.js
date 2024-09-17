import * as psql from "../models/register.js";
import { jwtSign } from "../../utils/jwt.js";

export const setUser = async (req, res) => {
  if (!req.body?.email || !req.body?.password || !req.body?.name) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Todos los campos son obligatorios",
    });
  }

  try {
    const [user] = await psql.registerUser(req.body);
    delete user.password;
    const token = jwtSign(user);
    res.status(201).json({
      status: true,
      code: 201,
      message: "Usuario registrado con exito",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, code: 500, message: { error } });
  }
};

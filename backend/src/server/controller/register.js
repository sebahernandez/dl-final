import * as psql from "../models/register.js";
import { jwtSign } from "../../utils/jwt.js";

export const setUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!email || !password || !name) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Todos los campos son obligatorios",
    });
  }

  try {
    // Registrar al usuario
    const [user] = await psql.registerUser(req.body);

    // Asegurarse de que se haya registrado un usuario
    if (!user) {
      return res.status(500).json({
        status: false,
        code: 500,
        message: "Error al registrar el usuario",
      });
    }

    // Eliminar la contraseña antes de enviar la respuesta
    delete user.password;

    // Generar el token JWT
    const token = jwtSign(user);

    // Responder con éxito y los datos del usuario
    res.status(201).json({
      status: true,
      code: 201,
      message: "Usuario registrado con éxito",
      user,
      token,
    });
  } catch (error) {
    // Loguear el error en el servidor para revisión
    console.error("Error al registrar usuario:", error);

    // Responder con un error genérico
    res.status(500).json({
      status: false,
      code: 500,
      message: "Error interno del servidor",
    });
  }
};

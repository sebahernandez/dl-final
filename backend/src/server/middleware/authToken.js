import { jwtVerify } from "../../utils/jwt.js"; // Asegúrate de que jwtVerify funcione correctamente

export const authToken = (req, res, next) => {
  // Obtener el encabezado Authorization

  const authorization = req.header("Authorization");

  // Verificar si el encabezado Authorization está presente
  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Usuario no autorizado, falta el token" });
  }

  // Dividir el encabezado Authorization en "Bearer" y el token
  const [bearer, token] = authorization.split(" ");

  // Verificar si el formato es correcto
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token mal formado" });
  }

  try {
    // Verificar el token y obtener los datos decodificados
    const decoded = jwtVerify(token); // Asegúrate de que jwtVerify devuelva los datos decodificados
    req.user = decoded; // Asignar el usuario decodificado al request

    // Continuar con la siguiente función (setUser)
    next();
  } catch (error) {
    // Si el token no es válido, devolver un error
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

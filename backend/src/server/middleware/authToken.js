import { jwtVerify } from "../../utils/jwt.js";
export const authToken = (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Usuario no autorizado, falta el token" });
  }
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token mal formado" });
  }

  try {
    const decoded = jwtVerify(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

import { jwtVerify } from "../../utils/jwt.js";

export const authToken = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (authorization === undefined) {
    return res.status(401).json({ message: "Sin token" });
  }

  const [bearer, token] = authorization.split(" ");
  console.log("Token valido", token);

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Sin autorizacion" });
  }

  try {
    jwtVerify(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalido" });
  }
};

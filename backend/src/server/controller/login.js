import * as psql from "../models/login.js";
import { jwtSign } from "../../utils/jwt.js";

export const validateUser = (req, res) => {
  psql
    .validateUser(req.body)
    .then((user) =>
      res.status(200).json({
        status: true,
        code: 200,
        message: "Autorizado",
        user,
        token: jwtSign(user),
      })
    )
    .catch((error) =>
      res.status(404).json({ status: false, code: 404, message: error })
    );
};

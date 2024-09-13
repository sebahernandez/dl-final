import { Router } from "express";
import { validateUser } from "../controller/login.js";
import { authToken } from "../middleware/authToken.js";

const login = Router();

login.post("/", authToken, validateUser);

export default login;

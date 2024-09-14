import { Router } from "express";
import { validateUser } from "../controller/login.js";

const login = Router();

login.post("/", validateUser);

export default login;

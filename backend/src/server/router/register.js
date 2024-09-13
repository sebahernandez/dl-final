import { Router } from "express";
import { setUser } from "../controller/register.js";

const register = Router();

register.post("/", setUser);

export default register;

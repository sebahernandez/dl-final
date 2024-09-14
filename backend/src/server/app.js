import express from "express";
import cors from "cors";
import { login, error, register, products } from "./router/index.js";

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.disable("x-powered-by");

app.use("/products", products);
app.use("/register", register);
app.use("/login", login);
app.use("*", error);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

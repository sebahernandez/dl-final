import express from "express";
import cors from "cors";
import {
  login,
  error,
  register,
  products,
  categories,
  contact,
} from "./router/index.js";

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.disable("x-powered-by");
app.use("/contact", contact);
app.use("/products", products);
app.use("/categories", categories);
app.use("/register", register);
app.use("/login", login);
app.use("*", error);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

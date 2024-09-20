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

const corsOptions = {
  origin: "https://dl-final.onrender.com", // Permitir solo solicitudes desde tu frontend en producción
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  credentials: true, // Permitir el envío de cookies y credenciales
  optionsSuccessStatus: 204, // Algunos navegadores antiguos manejan mejor el código 204
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

app.disable("x-powered-by");

// Definir rutas de la API
app.use("/contact", contact);
app.use("/products", products);
app.use("/categories", categories);
app.use("/register", register);
app.use("/login", login);

app.use("*", error);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

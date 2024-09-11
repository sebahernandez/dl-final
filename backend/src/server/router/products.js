import { Router } from "express";
import { getProducts, setProduct } from "../controller/products.js";
import { authToken } from "../middleware/authToken.js";

const products = Router();

// Primero ejecuta authToken, y luego setProduct o getProducts si la autenticación es correcta
products.post("/", authToken, setProduct);
products.get("/", authToken, getProducts);

export default products;

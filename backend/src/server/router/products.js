import { Router } from "express";
import { getProducts, setProduct } from "../controller/products.js";

const products = Router();

// Primero ejecuta authToken, y luego setProduct o getProducts si la autenticación es correcta
products.post("/", setProduct);
products.get("/", getProducts);

export default products;

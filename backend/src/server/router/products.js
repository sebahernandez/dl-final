import { Router } from "express";
import {
  getProducts,
  setProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/products.js";

const products = Router();

products.post("/", setProduct); // Crear producto
products.get("/", getProducts); // Obtener todos los productos
products.get("/:productid", getProductById); // Obtener producto por productid
products.put("/:productid", updateProduct); // Actualizar producto por productid
products.delete("/:productid", deleteProduct); // Eliminar producto por productid
export default products;

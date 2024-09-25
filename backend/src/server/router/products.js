import { Router } from "express";
import {
  getProducts,
  setProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/products.js";
import { authToken } from "../middleware/authToken.js";

const products = Router();

products.post("/", authToken, setProduct);
products.put("/:productid", authToken, updateProduct);
products.delete("/:productid", authToken, deleteProduct);
products.get("/", getProducts);
products.get("/:productid", getProductById);

export default products;

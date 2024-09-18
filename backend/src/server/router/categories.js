import express from "express";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categories.js"; // Asegúrate de importar tu controlador

const router = express.Router();

// Ruta para obtener todas las categorías
router.get("/", getCategories);

// Ruta para agregar una nueva categoría
router.post("/", addCategory);

// Ruta para actualizar una categoría por ID
router.put("/:id", updateCategory);

// Ruta para eliminar una categoría por ID
router.delete("/:id", deleteCategory);

export default router;

import * as categoriesModel from "../models/categories.js";

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

// Agregar una nueva categoría
export const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await categoriesModel.addCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar categoría", error });
  }
};

// Actualizar una categoría por ID
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCategory = await categoriesModel.updateCategory(id, name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar categoría", error });
  }
};

// Eliminar una categoría por ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoriesModel.deleteCategory(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría", error });
  }
};

import db from "../database/db_connect.js"; // Asegúrate de importar tu conexión a la base de datos

// Función para obtener todas las categorías
export const getCategories = async () => {
  const query = "SELECT * FROM categories;";
  const { rows } = await db(query);
  return rows;
};

// Función para agregar una nueva categoría
export const addCategory = async (name) => {
  const query = "INSERT INTO categories (name) VALUES ($1) RETURNING *;";
  const { rows } = await db(query, [name]);
  return rows[0]; // Retorna la nueva categoría creada
};

// Función para obtener una categoría por ID
export const getCategoryById = async (categoryid) => {
  const query = "SELECT * FROM categories WHERE categoryid = $1;";
  const { rows } = await db(query, [categoryid]);
  return rows[0]; // Retorna la categoría correspondiente
};

// Función para actualizar una categoría
export const updateCategory = async (categoryid, name) => {
  const query =
    "UPDATE categories SET name = $1 WHERE categoryid = $2 RETURNING *;";
  const { rows } = await db(query, [name, categoryid]);
  return rows[0]; // Retorna la categoría actualizada
};

// Función para eliminar una categoría
export const deleteCategory = async (categoryid) => {
  const query = "DELETE FROM categories WHERE categoryid = $1 RETURNING *;";
  const { rows } = await db(query, [categoryid]);
  return rows[0]; // Retorna la categoría eliminada
};

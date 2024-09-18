import * as psql from "../models/products.js";

// Crear un producto
export const setProduct = (req, res) => {
  psql
    .setProduct(req.body)
    .then(() =>
      res
        .status(201)
        .json({ status: true, code: 201, message: "Creado con éxito" })
    )
    .catch((error) =>
      res.status(409).json({
        status: false,
        code: 409,
        message: `Producto ya existe: ${error}`,
      })
    );
};

// Obtener todos los productos
export const getProducts = (req, res) => {
  psql
    .getProducts()
    .then((products) => res.status(200).json(products))
    .catch((err) =>
      res.status(400).json({ status: false, code: 400, message: err })
    );
};

// Obtener un producto por productid
export const getProductById = (req, res) => {
  const { productid } = req.params; // Cambiar 'id' por 'productid'
  psql
    .getProductById(productid) // Pasar 'productid' a la función del modelo
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          status: false,
          code: 404,
          message: "Producto no encontrado",
        });
      }
    })
    .catch((err) =>
      res.status(400).json({ status: false, code: 400, message: err })
    );
};

// Actualizar un producto
export const updateProduct = (req, res) => {
  const { productid } = req.params;
  console.log(req.params);
  const productData = req.body;
  console.log(req.body);

  // Validamos que el 'productid' esté presente y sea un número
  if (!productid || isNaN(Number(productid))) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "ID de producto no válido",
    });
  }

  // Pasamos el 'productid' junto con los datos del producto al modelo
  psql
    .updateProduct({ productid, ...productData })
    .then((updatedProduct) => {
      if (updatedProduct) {
        return res.status(200).json({
          status: true,
          code: 200,
          message: "Producto actualizado con éxito",
          product: updatedProduct,
        });
      } else {
        return res.status(404).json({
          status: false,
          code: 404,
          message: "Producto no encontrado",
        });
      }
    })
    .catch((err) =>
      res.status(400).json({
        status: false,
        code: 400,
        message: `Error al actualizar el producto: ${err.message}`,
      })
    );
};

// Eliminar un producto
export const deleteProduct = (req, res) => {
  const { productid } = req.params; // Asegúrate de que el parámetro es 'productid'
  psql
    .deleteProduct(productid) // Pasar 'productid' a la función del modelo
    .then(() =>
      res.status(200).json({
        status: true,
        code: 200,
        message: "Producto eliminado con éxito",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: false,
        code: 400,
        message: `Error al eliminar producto: ${err}`,
      })
    );
};

// Obtener todas las categorías
export const getCategories = (req, res) => {
  psql
    .getCategories()
    .then((categories) => res.status(200).json(categories))
    .catch((err) =>
      res.status(400).json({ status: false, code: 400, message: err })
    );
};

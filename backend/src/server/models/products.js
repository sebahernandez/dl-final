import db from "../database/db_connect.js";

// Crear un nuevo producto
export const setProduct = async ({
  name,
  description,
  price,
  stock,
  creationdate = Date.now(),
  image,
  category,
  gender,
  sizes,
  brand,
}) => {
  try {
    const query = `
      INSERT INTO products 
        (name, description, price, stock, creationdate, image, categoryid, gender, sizes, brand)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const { rows } = await db(query, [
      name,
      description,
      price,
      stock,
      creationdate,
      image,
      category,
      gender,
      sizes,
      brand,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error al crear el producto:", error);
    if (error.constraint === "products_name_key") {
      // Si hay una restricción única en el nombre del producto
      throw new Error("El producto ya existe");
    } else {
      throw error;
    }
  }
};

// Obtener todos los productos
export const getProducts = async () => {
  const query = `
    SELECT 
      products.productid,
      products.name,
      products.description,
      products.price,
      products.stock,
      products.creationdate,
      products.image,
      products.sizes,
      products.brand,
      categories.name AS category, 
      products.gender
    FROM products
    JOIN categories ON products.categoryid = categories.categoryid;
  `;
  const { rows } = await db(query);
  return rows;
};

// Actualizar un producto existente
export const updateProduct = async ({
  productid,
  name,
  description,
  price,
  stock,
  image,
  category,
  gender,
  sizes,
  brand,
}) => {
  console.log(`Actualizando producto con ID: ${productid}`);
  const query = `
    UPDATE products 
    SET name = $1, description = $2, price = $3, stock = $4, image = $5, categoryid = $6, gender = $7, sizes = $8, brand = $9
    WHERE productid = $10
    RETURNING *;
  `;
  const { rows } = await db(query, [
    name, // $1
    description, // $2
    price, // $3
    stock, // $4
    image, // $5
    category, // $6 (categoryid, que es un número)
    gender, // $7
    sizes, // $8 (jsonb para el array de tallas)
    brand, // $9
    productid, // $10 (El ID del producto a actualizar en el WHERE)
  ]);
  return rows[0];
};

// Eliminar un producto por ID
export const deleteProduct = async (productid) => {
  try {
    console.log(`Eliminando producto con ID: ${productid}`);

    const query = "DELETE FROM products WHERE productid = $1";
    const result = await db(query, [productid]);

    if (result.rowCount === 0) {
      console.log(`Producto con ID ${productid} no encontrado`);
      throw new Error(`Producto con ID ${productid} no encontrado`);
    } else {
      console.log(`Producto con ID ${productid} eliminado exitosamente`);
    }
  } catch (error) {
    console.error(`Error al eliminar el producto: ${error.message}`);
    throw error;
  }
};

import db from "../database/db_connect.js";

export const setProduct = async ({
  name,
  description,
  price,
  stock,
  creationdate = Date.now(),
  image,
  categoryid = 1,
  gender,
  sizes,
  gallery,
  brand,
}) => {
  const query =
    "INSERT INTO products (name, description, price, stock, creationdate, image, categoryid, gender, sizes, gallery, brand) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )";
  await db(query, [
    name,
    description,
    price,
    stock,
    creationdate,
    image,
    categoryid,
    gender,
    sizes,
    gallery,
    brand,
  ]);
};

export const getProducts = async () => {
  const query = "SELECT * FROM products;";
  const { rows } = await db(query);
  return rows;
};

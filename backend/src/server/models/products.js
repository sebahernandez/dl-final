import db from '../database/db_connect.js'

export const setProduct = async ({ name, description, price, stock, creationdate = Date.now(), image, categoryid = 1, gender }) => {
  const query = 'INSERT INTO products ( name, description, price, stock, creationdate, image, categoryid, gender ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )'
  await db(query, [name, description, price, stock, creationdate, image, categoryid, gender])
}

export const getProducts = async () => {
  const query = 'SELECT * FROM products;'
  const { rows } = await db(query)
  return rows
}

import * as psql from '../models/products.js'

export const setProduct = (req, res) => {
  psql.setProduct(req.body)
    .then(() => res.status(201).json({ status: true, code: 201, message: 'Creado con exito' }))
    .catch((error) => res.status(409).json({ status: false, code: 409, message: `producto ya existe ${error}` }))
}

export const getProducts = (req, res) => {
  psql.getProducts()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(400).json({ status: false, code: 400, message: err }))
}

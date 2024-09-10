import { Router } from 'express'
import { getProducts, setProduct } from '../controller/products.js'
import { authToken } from '../middleware/authToken.js'

const products = (Router())

products.post('/', setProduct)
products.get('/', getProducts)

export default products

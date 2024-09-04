import { Router } from 'express'
const error = (Router())

error.all('/', (req, res) => res.status(404).json({ status: false, message: 'No se encontro la ruta, error por defecto' }))

export default error

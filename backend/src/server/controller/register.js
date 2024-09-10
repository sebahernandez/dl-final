import * as psql from '../models/register.js'

export const setUser = (req, res) => {
  psql.setUser(req.body)
    .then(() => res.status(201).json({ status: true, code: 201, message: 'Creado con exito' }))
    .catch((error) => res.status(409).json({ status: false, code: 409, message: `usuario existe ${error}` }))
}


import * as psql from '../models/login.js'

export const validateUser = (req, res) => {
  psql.validateUser(req.body)
    .then((result) => res.status(200).json({ status: true, code: 201, message: 'Autorizado', token: result }))
    .catch((error) => res.status(404).json({ status: false, code: 404, message: error }))
}

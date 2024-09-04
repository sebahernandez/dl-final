import { jwtVerify } from '../../utils/jwt.js'

export const authToken = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (authorization === undefined) res.status(401).json({ message: 'Sin token' })

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') res.status(401).json({ message: 'Sin autorizacion' })

  try {
    jwtVerify(token)
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token invalido' })
  }
}

import db from '../database/db_connect.js'
import { jwtSign } from '../../utils/jwt.js'
import bcrypt from 'bcryptjs'

export const validateUser = async ({ email, password }) => {
  const query = 'SELECT * FROM users WHERE email = $1'
  const { rows: [user] } = await db(query, [email])
  const validate = await bcrypt.compare(password, user.password)
  if (!validate) {
    const err = { code: 401, message: 'Wrong password or email' }
    throw err
  }
  const token = jwtSign({ email })
  return token
}

import { Router } from 'express'
import { setUser } from '../controller/register.js'
import { authToken } from '../middleware/authToken.js'

const register = (Router())

register.post('/', setUser)

export default register

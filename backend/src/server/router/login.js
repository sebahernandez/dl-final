import { Router } from 'express'
import { validateUser } from '../controllers/login.js'

const login = (Router())

login.post('/', validateUser)

export default login

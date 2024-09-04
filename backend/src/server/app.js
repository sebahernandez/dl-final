import Express from 'express'
import cors from 'cors'
import { login, error } from './router/index.js'

const app = Express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(Express.json())

app.disable('x-powered-by')

app.use('/login', login)
app.use('*', error)

app.listen(PORT, () => console.log(`Informacion de la API:\nRuta Login : http://localhost:${PORT}/login\nRuta Usuarios : http://localhost:${PORT}/Usuarios`))

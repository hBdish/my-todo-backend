import 'dotenv/config'
import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { sequelize } from './db.js'
import errorMiddleware from './middlewares/error-middleware.js'
import authMiddleware from './middlewares/auth-middleware.js'

const PORT = 6200
const app = express()
const router = Router()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(authMiddleware)
app.use('/api/v1', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server start on ${PORT} port`))
  } catch (e) {
    console.log(e)
  }

  try {
    await sequelize.authenticate()
    await sequelize.sync()

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

router.get('/test', (req, res, next) => {
  res.json('Hello world!')
})

start()

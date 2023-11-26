import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { mongoConnection } from './db.js'
import errorMiddleware from './middlewares/error-middleware.js'
import authMiddleware from './middlewares/auth-middleware.js'
import router from './router/index.js'

const PORT = 6200
const app = express()

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
    await mongoConnection.then(() => console.log('Connection has been established successfully.'))
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

start()

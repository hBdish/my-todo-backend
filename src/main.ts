import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { sequelize } from './db.js'

const PORT = Number(process.env.PORT) || 5050
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const start = async () => {
  try {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
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

start()

import { Sequelize } from 'sequelize'
import mongoose from 'mongoose'

// const sequelize = new Sequelize(
//   `postgres://${process.env.DATEBASE_USER}:${process.env.DATEBASE_PASSWORD}@${process.env.DATEBASE_HOST}:6201/${process.env.DATEBASE_NAME}`,
//   {
//     dialect: 'postgres',
//   },
// )

const mongoConnection = mongoose.connect(
  `mongodb://${process.env.DATEBASE_USER_MONGO}:${process.env.DATEBASE_PASSWORD_MONGO}@${process.env.DATEBASE_HOST_MONGO}:${process.env.DATEBASE_PORT_MONGO}/${process.env.DATEBASE_NAME_MONGO}?authSource=admin`,
)

export { mongoConnection }

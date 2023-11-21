import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  `postgres://${process.env.DATEBASE_USER}:${process.env.DATEBASE_PASSWORD}@${process.env.DATEBASE_HOST}:6201/${process.env.DATEBASE_NAME}`,
  {
    dialect: 'postgres',
  },
)

export { sequelize }

import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import { CreationOptional } from 'sequelize'
import { sequelize } from '../db.js'

interface UserSchema extends Model<InferAttributes<UserSchema>, InferCreationAttributes<UserSchema>> {
  id: CreationOptional<string>
  email: string
  password: string
  isActivated: boolean
  activationLink: CreationOptional<string>
}

const UserModel = sequelize.define<UserSchema>('User', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activationLink: {
    type: DataTypes.STRING,
  },
})

export { UserModel }

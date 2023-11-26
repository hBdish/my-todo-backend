import mongoose from 'mongoose'
import { CompanyTypes } from './company-model.js'
import { BoardTypes } from './board-models.js'

const { Schema, model } = mongoose

type UserRole = 'ADMIN' | 'WRITER' | 'READER'

export interface UserTypes extends mongoose.Document {
  companyName: string
  role: UserRole
  avatar: string
  companies: CompanyTypes[]
  boards: BoardTypes[]
}

const UserSchema = new Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  companies: [{ type: Schema?.Types.ObjectId, ref: 'Company' }],
  boards: [{ type: Schema?.Types.ObjectId, ref: 'Board' }],
})

const User = model<UserTypes>('User', UserSchema)

export default User

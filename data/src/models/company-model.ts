import mongoose from 'mongoose'
import { BoardTypes } from './board-models.js'

const { Schema, model } = mongoose

export interface CompanyTypes extends mongoose.Document {
  companyName: string
  boards: BoardTypes
}

const CompanySchema = new Schema({
  companyName: { type: String, required: true },
  boards: [{ type: Schema?.Types.ObjectId, ref: 'Boards' }],
})

const Company = model<CompanyTypes>('Company', CompanySchema)

export default Company

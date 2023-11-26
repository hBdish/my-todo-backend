import mongoose from 'mongoose'
import { BoardTypes } from './board-models.js'

const { Schema, model } = mongoose

export interface SprintTypes extends mongoose.Document {
  dateStart: string
  dateEnd: string
  board: BoardTypes
}

const SprintSchema = new Schema({
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  board: { type: Schema?.Types.ObjectId, ref: 'Board' },
})

const Sprint = model<SprintTypes>('Sprint', SprintSchema)

export default Sprint

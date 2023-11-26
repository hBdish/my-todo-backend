import mongoose from 'mongoose'
import { TaskTypes } from './task-models.js'

const { Schema, model } = mongoose

export interface BoardColumnTypes extends mongoose.Document {
  companyName: string
  title: string
  tasks: TaskTypes[]
}

const BoardColumnSchema = new Schema({
  companyName: { type: String, required: true },
  title: { type: String, required: true },
  tasks: [{ type: Schema?.Types.ObjectId, ref: 'Task' }],
})

const BoardColumn = model<BoardColumnTypes>('BoardColumnModels', BoardColumnSchema)

export default BoardColumn

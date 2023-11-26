import mongoose from 'mongoose'
import { Priority } from '../types/types.js'
import { TaskTypes } from './task-models.js'

const { Schema, model } = mongoose

export interface SprintRowTypes extends mongoose.Document {
  priority: Priority
  tasks: TaskTypes[]
}

const SprintRowSchema = new Schema({
  priority: { type: String, required: true, default: 'MEDIUM' },
  tasks: [{ type: Schema?.Types.ObjectId, ref: 'Task' }],
})

const SprintRow = model<SprintRowTypes>('SprintRow', SprintRowSchema)

export default SprintRow

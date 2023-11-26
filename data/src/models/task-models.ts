import mongoose from 'mongoose'
import { BoardTypes } from './board-models.js'
import { UserTypes } from './user-model.js'
import { Priority } from '../types/types.js'

const { Schema, model } = mongoose

export interface TaskTypes extends mongoose.Document {
  title: string
  descriptions: string
  dateOfCreated: string
  dateOfCompleted: string
  priority: Priority
  owner: UserTypes
  users: UserTypes[]
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  descriptions: { type: String },
  dateOfCreated: { type: String, required: true },
  dateOfCompleted: { type: String },
  priority: { type: String, required: true, default: 'MEDIUM' },
  owner: { type: Schema?.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema?.Types.ObjectId, ref: 'User' }],
})

const Task = model<TaskTypes>('Task', TaskSchema)

export default Task

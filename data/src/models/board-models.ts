import mongoose from 'mongoose'
import { BoardColumnTypes } from './board-column-models.js'
import { UserTypes } from './user-model.js'
import { SprintTypes } from './sprint-models.js'

const { Schema, model } = mongoose

type BoardType = 'ПО' | 'Бизнес, управление командой'

export interface BoardTypes extends mongoose.Document {
  companyName: string
  type: BoardType
  name: string
  boardColumns: BoardColumnTypes[]
  users: UserTypes[]
  sprint: SprintTypes
}

const BoardSchema = new Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  boardColumns: [{ type: Schema?.Types.ObjectId, ref: 'BoardColumn' }],
  users: [{ type: Schema?.Types.ObjectId, ref: 'User' }],
  sprint: { type: Schema?.Types.ObjectId, ref: 'Sprint' },
})

const Board = model<BoardTypes>('Board', BoardSchema)

export default Board

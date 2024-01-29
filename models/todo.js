import mongoose from "mongoose";
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  userId: {
    // 去參照User的ObjectId
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  }
})

const Todo = mongoose.model("Todo", todoSchema)
export default Todo
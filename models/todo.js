const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: [true, "Name is required."],
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;

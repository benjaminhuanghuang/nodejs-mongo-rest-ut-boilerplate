const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: [true, "Name is required."],
    minlength: 2,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  completeAt: {
    type: Number,
    default: null
  }
});

const Todo = mongoose.model("todo", ArtistSchema);

module.exports = Todo;

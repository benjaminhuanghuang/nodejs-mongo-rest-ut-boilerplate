const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required."],
    minlength: 2,
    trim: true
  }
});

const User = mongoose.model("user", ArtistSchema);

module.exports = User;
 
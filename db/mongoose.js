const mongoose = require("mongoose");
const keys = require("../config/keys");
mongoose.Promise = global.Promise;

// Use testing database for testing
if (process.env.NODE_ENV !== "test")
  mongoose.connect(keys.mongoURI, { useMongoClient: true });

module.exports = { mongoose };

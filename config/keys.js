// keys.js - figure out what set of credentials to return
const env = process.env.NODE_ENV || "development";

if (env === "production") {
  // Heroku will set process.env
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
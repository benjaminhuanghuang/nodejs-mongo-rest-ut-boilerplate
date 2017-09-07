var db = require('./db');

module.exports.handleSignup = (email, password) => {
  // Check email already exist
  // save user to database
  db.saveUser({
    email, password
  });
  // send welcome email ot user
};

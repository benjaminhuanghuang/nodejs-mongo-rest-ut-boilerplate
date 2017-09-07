const sinon = require('sinon');
const rewire = require('rewire');

var app = rewire('./app');

describe("spy demo", ()=>{
  var db = {
    saveUser: sinon.spy()
  };
  app.__set__('db', db);   // mock the db object in the app

  it("should call the spy correctly",()=>{
    var spy = sinon.spy();
    spy('ben',100);
    sinon.assert.calledWith(spy, "ben", 100);
  });

  it ('should call saveUser with user object', ()=>{
    var email = "ben@gmail.com";
    var password = "123abc";

    app.handleSignup(email, password);   // call the spy
    sinon.assert.calledWith(db.saveUser, {email, password});
  });
});
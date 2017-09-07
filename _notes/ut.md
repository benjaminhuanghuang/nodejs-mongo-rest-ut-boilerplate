## npm script
  ```
  "test": "nodemon --exec 'mocha --recursive'"

  "test": "nodemon --exec 'mocha **/*.test.js'"

  "test": "mocha **/*.test.js"
  "test-watch": "nodemon --exec 'npm test'"
  ```
## Assertion
  const expect = require("chai").expect;
  or
  const assert = require("assert");
  
## Async test
  For the async function testing, the test case will return before the callback was fired. 
  Mocha provide callback function done() to determine the async testing. 
  In the test case, we call done() to end a test case , or Mocha will raise timeout error after 2000ms.
  
  ```
  it("", done=>{
    asyncAdd(1,2, sum=>{
      expect(sum).toBe(3).toBeA('number');
      done();
    });
  });
  ```

## Supertest for HTTP request testing
  npm i supertest -D
  
  export app for testing
  ```
  module.exports.app = app;
  ```

  in test.js, send a GET request to app. end() function will be called after request.
  request is async function need call done()
  ```
  it('should return "Hello world"', done => {
    request(app).get('/')
    .expect(200)
    .expect((res)=>{
      expect(res.body).toInclude({name:"abc"})     // require expect
    }))
    .end(done);
  });
  ```

## Mock by using sinon and rewire
  - https://github.com/mochajs/mocha/wiki
  
  Create a spy and expect it was called
  ```
  it("should call the spy correctly",()=>{
    var spy = sinon.spy();
    spy('ben',100);
    sinon.assert.calledWith(spy, "ben", 100);
  });

  ```
  
  Use rewire to mock a object

  ```
  var app = rewire('./app');

  describe("App", ()=>{
    var db = {
      saveUser: sinon.spy();
    };
    app.__set__('db', db);   // mock the db object in the app

    it ('should call saveUser with user object', ()=>{
      var email = "ben@gmail.com";
      var password = "123abc";

      app.handleSignup(email, password);   // call the spy
      sinon.assert.calledWith(db.saveUser, {email, password});
    });
  });
  ```
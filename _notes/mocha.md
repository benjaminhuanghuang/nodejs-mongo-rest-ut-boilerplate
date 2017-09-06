## npm script
  ```
  "test": "nodemon --exec 'mocha --recursive'"

  "test": "nodemon --exec 'mocha **/*.test.js'"

  "test": "mocha **/*.test.js"
  "test-watch": "nodemon --exec 'npm test'"
  ```


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
    .expect('Hello world')
    .end(done);
  });
  ```

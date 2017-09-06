## npm script
  ```
  "test": "nodemon --exec 'mocha --recursive'"

  "test": "nodemon --exec 'mocha **/*.test.js'"

  "test": "mocha **/*.test.js"
  "test-watch": "nodemon --exec 'npm test'"
  ```


## Async test
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

  in test.js, send a GET request to app
  ```
  it('should return "Hello world"', done => {
    request(app).get('/')
    .expect(200)
    .expect('Hello world')
    .end(done);
  });
  ```

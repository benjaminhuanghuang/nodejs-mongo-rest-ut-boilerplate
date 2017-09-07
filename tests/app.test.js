const request = require('supertest');
//
var app = require('../app');
var Todo =  require('../models/todo')

describe('app testing : ', () => {
  it('should return "Hello world"', (done) => {
    request(app).get('/')
    .expect(200)
    .expect('Hello world')
    .end(done);
  });
});


describe('POST /todos : ', () => {
  it('should crate a new todo', (done) => {
    var text = 'Test todo text';

    request(app).post('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end(done);
  });
});
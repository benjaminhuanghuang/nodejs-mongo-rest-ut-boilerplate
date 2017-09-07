const request = require('supertest');
const expect = require("chai").expect;

//
var app = require('../app');
var Todo =  require('../models/todo')

beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
});

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
    const text = 'Test todo text';
    request(app).post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).to.equal(text);
    })
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).to.equal(1);
        expect(todos[0].text).to.equal(text);
        done();
      })
      .catch(e=>{
        done(e);
      })
    });
  });

  it('should not crate todo with invalid body ', (done) => {
    request(app).post('/todos')
    .send({})
    .expect(400)
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).to.equal(0);
        done();
      })
      .catch(e=>{
        done(e);
      })
    });
  });

});
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
  beforeEach((done)=>{
    Todo.remove({}).then(()=>done());
  });

  it('should crate a new todo', (done) => {
    var text = 'Test todo text';

    request(app).post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todo.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      })
      .catch(e=>{
        done(e);
      })
    });
  });

  it('should not crate todo with invalid body ', (done) => {
    request(app).post('/todos')
    .expect(400)
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todo.length).toBe(0);
        done();
      })
      .catch(e=>{
        done(e);
      })
    });
  });
});
const request = require("supertest");
const { expect, assert} = require("chai");
const should = require('chai').should(); 
const { ObjectID } = require("mongodb");

//
var app = require('../app');
var Todo =  require('../models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
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

      Todo.find({text}).then((todos)=>{
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
        expect(todos.length).to.equal(2);
        done();
      })
      .catch(e=>{
        done(e);
      })
    });
  });

});

describe('GET /todos : ', () => {

  it('should get all todos', (done) => {
    request(app).get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).to.equal(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id ', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).to.equal(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).to.equal(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).to.not.exist;
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';
    
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).to.equal(text);
        expect(res.body.todo.completed).to.be.true;
        assert.isNumber(res.body.todo.completedAt);
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).to.equal(text);
        expect(res.body.todo.completed).to.be.false;
        expect(res.body.todo.completedAt).to.not.exist;
      })
      .end(done);
  });
});
const request = require('supertest');
//
var app = require('../server');

describe('app testing : ', () => {
  it('should return "Hello world"', (done) => {
    request(app).get('/')
    .expect(200)
    .expect('Hello world')
    .end(done);
  });
});

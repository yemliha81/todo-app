const chai = require('chai');
const chatHttp = require('chai-http');
const app = require('../app');

chai.use(chatHttp);
const { expect } = chai;

describe('Testing if db is ready :', () => {
    it('It should check the db if it is ready', (done) => {
      chai.request(app)
        .get('/')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
});

describe('Testing insertion :', () => {
  it('It should create a task', (done) => {
    const taskData = {
      task: 'Test Task',
      priority: 'medium',
      taskdate: '2020/03/30'
    };
    chai.request(app)
      .post('/addTask')
      .set('Accept', 'application/json')
      .send(taskData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

});

describe('Testing update :', () => {
    it('It should update a task', (done) => {
      const taskData = {
        id: 1,
        priority: 'medium'
      };
      chai.request(app)
        .post('/updateTask')
        .set('Accept', 'application/json')
        .send(taskData)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  
  });

describe('Testing tasks :', () => {
    it('It should check tasks data', (done) => {
      chai.request(app)
        .get('/gettodolist')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
});

describe('Testing deletion of the test tasks:', () => {
    it('It should delete the task with id 1', (done) => {
      chai.request(app)
        .get('/delTask/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  
  });
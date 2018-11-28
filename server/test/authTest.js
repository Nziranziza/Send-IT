import chai from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import Database from '../db/database';
import app from '../app';

chai.should();
chai.use(chaiHttp);
describe('Signup Test', () => {
  // Clear the database
  beforeEach('Clear data from database', (done) => {
    chai.request(app);
    Database.execute('DELETE FROM user_table');
    done();
  });
  it('it should create a user account', (done) => {
    const data = {
      firstName: 'Simon',
      lastName: 'Peter',
      email: 'simon@sendit.com',
      password: '1234567890'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        res.body.user.should.have.property('id');
        res.body.user.should.have.property('first_name').eql('Simon');
        res.body.user.should.have.property('last_name').eql('Peter');
        res.body.user.should.have.property('email').eql('simon@sendit.com');
        res.body.user.should.have.property('password');
        res.body.user.should.have.property('username').eql('SimonPeter');
        res.body.user.should.have.property('role').eql('user');
        res.body.user.should.have.property('created_date');
        done();
      });
  });
  it('it should not create a user account when input are not complete', (done) => {
    const data = {
      firstName: 'Simon',
      lastName: 'Peter',
      email: 'simon@sendit.com'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('All fields are required');
        done();
      });
  });
});
describe('Login Test', () => {
  beforeEach('Create a user', (done) => {
    const data = {
      password: '1234',
      firstName: 'John',
      lastName: 'Doe',
      email: 'doe@sendit.com'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((error) => {
        if (error) done(error);
        done();
      });
  });
  it('it should login user account', (done) => {
    const data = {
      email: 'doe@sendit.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.should.have.property('user');
        done();
      });
  });
  it('it should not login user with incomplete', (done) => {
    const data = {
      password: '1234567890'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('All fields are required');
        done();
      });
  });
});

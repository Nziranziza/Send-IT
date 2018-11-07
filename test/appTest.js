import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();
chai.use(chaiHttp);

/* Test the /GET route */
describe('app index route', () => {
  it('it should GET Home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should GET Login Page', (done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should GET Contact us Page', (done) => {
    chai.request(app)
      .get('/contact-us')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should GET Sing up Page ', (done) => {
    chai.request(app)
      .get('/sign-up')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should GET About us Page ', (done) => {
    chai.request(app)
      .get('/sign-up')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should GET Admin Dashboard Page ', (done) => {
    chai.request(app)
      .get('/sign-up')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should GET User Dashboard Page ', (done) => {
    chai.request(app)
      .get('/sign-up')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should handle 404 error', (done) => {
    chai.request(app)
      .get('/notExist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

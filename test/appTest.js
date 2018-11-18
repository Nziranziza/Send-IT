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
describe('Parcels Routes Test', () => {
  // Testing create parcel endpoint
  it('it should create parcel', (done) => {
    const data = {
      from: 'Muhanga',
      destination: 'Kigali',
      weight: 23
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('from').eql('Muhanga');
        res.body.should.have.property('destination').eql('Kigali');
        res.body.should.have.property('owner');
        res.body.should.have.property('presentLocation').eql('Muhanga');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('weight').eql(23);
        res.body.should.have.property('price').eql(10350);
        done();
      });
  });
  it('it should not create parcel', (done) => {
    const data = {
      from: 'Muhanga',
      destination: 'Kigali'
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done();
      });
  });
  // Testing getting all parcel delivery order
  it('it should get all parcel', (done) => {
    chai.request(app)
      .get('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });
  // Testing getting one parcel delivery order
  it('it should get one parcel', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/1232-3c44-xr4-35452-4c45c4c-35c345c-ccr')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('1232-3c44-xr4-35452-4c45c4c-35c345c-ccr');
        res.body.should.have.property('from').eql('Muhanga');
        res.body.should.have.property('destination').eql('Kigali');
        res.body.should.have.property('owner').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
        res.body.should.have.property('presentLocation').eql('Muhanga');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('weight').eql('10 kg');
        done();
      });
  });
  it('it should not get parcel', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/1233445667788899')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });
  // Testing for getting parcels for one user
  it('it should get all parcels for user', (done) => {
    chai.request(app)
      .get('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
  it('it should not get all parcels for user', (done) => {
    chai.request(app)
      .get('/api/v1/users/dc20098c-a5a2-4694-8379/parcels')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcels not found');
        done();
      });
  });
  // Testing for cancelling parcels delivery order
  it('it should cancel parcel delivery order', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1232-3c44-xr4-35452-4c45c4c-35c345c-ccr/cancel')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('canceled');
        done();
      });
  });
  it('it should not cancel parcel delivery order', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1232-3c44-xr4-35452-/cancel')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });
  // Testing parcel delivery update
  it('it should update parcel delivery order', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1232-3c44-xr4-35452-4c45c4c-35c345c-ccr/update')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('1232-3c44-xr4-35452-4c45c4c-35c345c-ccr');
        res.body.should.have.property('from');
        res.body.should.have.property('destination');
        res.body.should.have.property('owner');
        res.body.should.have.property('presentLocation');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('weight');
        done();
      });
  });
  it('it should not update parcel delivery order', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1232-3c44-xr4-35452/update')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });
  // Testing for delete
  it('it should delete parcel delivery order', (done) => {
    chai.request(app)
      .delete('/api/v1/parcels/1232-3c44-xr4-35452-4c45c4c-35c345c-ccr/delete')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel was deleted successfully!!!');
        done();
      });
  });
  it('it should not delete parcel delivery order', (done) => {
    chai.request(app)
      .delete('/api/v1/parcels/1232-3c44-xr4-3/delete')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });
});
// User route test
describe('api routes for user', () => {
  // Testing for create user
  it('it should create user account', (done) => {
    const data = {
      firstname: 'Clet',
      lastname: 'Mwunguzi',
      email: 'clet@gmail.com',
      password: '1234567890'
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('firstname').eql('Clet');
        res.body.should.have.property('lastname').eql('Mwunguzi');
        res.body.should.have.property('email').eql('clet@gmail.com');
        res.body.should.have.property('password').eql('1234567890');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('username').eql('CletMwunguzi');
        res.body.should.have.property('isloggedin').eql(true);
        done();
      });
  });
  it('it should not create user account', (done) => {
    const data = {
      firstname: 'Clet',
      lastname: 'Mwunguzi',
      email: 'clet@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done();
      });
  });
  // Testing for fetch all users
  it('it should get all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });
  // Testing for fetch a specific user
  it('it should get a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
        res.body.should.have.property('firstname').eql('Daniel');
        res.body.should.have.property('lastname').eql('Nziranziza');
        res.body.should.have.property('email').eql('nziranzizadaniel@gmail.com');
        res.body.should.have.property('password').eql('123456789');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('username').eql('Daniel');
        res.body.should.have.property('isloggedin').eql(false);
        done();
      });
  });
  it('it should not get all a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/dc20098c-a5a2-4694-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
});

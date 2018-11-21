import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();
chai.use(chaiHttp);
// Test error 404
describe('Error 404 test', () => {
  chai.request(app)
    .get('/notexist')
    .end((err, res) => {
      res.should.have.status(404);
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
  // Test for logout account
  it('it should not logout user account', (done) => {
    chai.request(app)
      .put('/api/v1/users/logout')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  // Testing for create user
  it('it should create user account', (done) => {
    const data = {
      firstName: 'Clet',
      lastName: 'Mwunguzi',
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
        res.body.should.have.property('firstName').eql('Clet');
        res.body.should.have.property('lastName').eql('Mwunguzi');
        res.body.should.have.property('email').eql('clet@gmail.com');
        res.body.should.have.property('password').eql('1234567890');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('CletMwunguzi');
        res.body.should.have.property('isloggedin').eql(true);
        done();
      });
  });
  it('it should not create user account', (done) => {
    const data = {
      firstName: 'Clet',
      lastName: 'Mwunguzi',
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
        res.body.should.have.property('firstName').eql('Daniel');
        res.body.should.have.property('lastName').eql('Nziranziza');
        res.body.should.have.property('email').eql('nziranzizadaniel@gmail.com');
        res.body.should.have.property('password').eql('123456789');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('Daniel');
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
  // Testing for login
  it('it should login user account', (done) => {
    const data = {
      email: 'nziranzizadaniel@gmail.com',
      password: '123456789',
    };
    chai.request(app)
      .put('/api/v1/users/login')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('isloggedin').eql(true);
        done();
      });
  });
  it('it should not login user account', (done) => {
    const data = {
      email: 'nziranzizadaniel@gmail.com'
    };
    chai.request(app)
      .put('/api/v1/users/login')
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
  it('it should logout user account', (done) => {
    chai.request(app)
      .put('/api/v1/users/logout')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('isloggedin').eql(false);
        done();
      });
  });
  // Testing for updating user account
  it('it should update user profile', (done) => {
    chai.request(app)
      .put('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341/update-profile')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
        res.body.should.have.property('firstName').eql('Daniel');
        res.body.should.have.property('lastName').eql('Nziranziza');
        res.body.should.have.property('email').eql('nziranzizadaniel@gmail.com');
        res.body.should.have.property('password').eql('123456789');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('Daniel');
        res.body.should.have.property('isloggedin').eql(false);
        done();
      });
  });
  it('it should update user profile', (done) => {
    const data = {
      firstName: 'Dan',
      lastName: 'Bryan',
      email: 'danbryan@gmail.com'
    };
    chai.request(app)
      .put('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341/update-profile')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
        res.body.should.have.property('firstName').eql('Dan');
        res.body.should.have.property('lastName').eql('Bryan');
        res.body.should.have.property('email').eql('danbryan@gmail.com');
        res.body.should.have.property('password').eql('123456789');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('Daniel');
        res.body.should.have.property('isloggedin').eql(false);
        done();
      });
  });
  it('it should not update user profile', (done) => {
    const data = {
      firstName: 'Dan',
      lastName: 'Bryan',
      email: 'danbryan@gmail.com'
    };
    chai.request(app)
      .put('/api/v1/users/dc20098c-a5a2-4694-8379-3341/update-profile')
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
  // Testing for delete user account
  it('it should delete user account', (done) => {
    chai.request(app)
      .delete('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341/delete')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user was deleted successfully!!!');
        done();
      });
  });
  it('it should not delete user account', (done) => {
    chai.request(app)
      .delete('/api/v1/users/dc20098c-a5a2-8379-62d41ca03341/delete')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
});
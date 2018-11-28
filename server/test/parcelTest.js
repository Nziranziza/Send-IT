import chai from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import Database from '../db/database';

import app from '../app';

chai.should();
chai.use(chaiHttp);
let parcelId;
// Testing create parcel
describe('Parcel Routes Test', () => {
  let userToken;
  let userId;
  before((done) => {
    chai.request(app);
    Database.createAdmin();
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jennah@sendit.com',
        password: 'jennah',
        firstName: 'Jennah',
        lastName: 'Haque'
      })
      .end((err, res) => {
        userToken = res.body.token;
        userId = res.body.user.id;
        done();
      });
  });
  it('it should create parcel', (done) => {
    const data = {
      from: 'Muhanga',
      destination: 'Kigali',
      weight: 23
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .set('x-access-token', userToken)
      .send(data)
      .end((err, res) => {
        parcelId = res.body.id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('origin').eql('Muhanga');
        res.body.should.have.property('destination').eql('Kigali');
        res.body.should.have.property('owner_id').eql(userId);
        res.body.should.have.property('created_date');
        res.body.should.have.property('price').eql(10350);
        res.body.should.have.property('weight').eql(23);
        res.body.should.have.property('status').eql('Pending');
        done();
      });
  });
  it('it should not create parcel without complete fields', (done) => {
    const data = {
      from: 'Muhanga',
      destination: 'Kigali',
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .set('x-access-token', userToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done();
      });
  });
  it('it should not create parcel with malformed token', (done) => {
    const data = {
      from: 'Muhanga',
      destination: 'Kigali',
      weight: 23
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .set('x-access-token', 'wyeucbnbcidncjdncjdndjvbldnkancdnckdn')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('jwt malformed');
        done();
      });
  });
  it('it should not create parcel with invalid token', (done) => {
    const data = {
      from: 'Muhanga',
      destination: 'Kigali',
      weight: 23
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjA1ZWYwNTBhLWVlNzItNGY5My04Mjg4LWI5Y2I0ZjFjNDQwNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQzNDc3Mjg4fQ._Ob4s70y8necNNf1ncXKc48Kuyhqs3z_q2tRCpUbm6E')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('invalid token');
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
        done();
      });
  });
  it('it should not get parcel', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/dc20098c-a5a2-4694-8379-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });

  // Change destination test
  it('it should change the destination', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/destination`)
      .set('x-access-token', userToken)
      .send({ destination: 'Lagos' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('origin').eql('Muhanga');
        res.body.should.have.property('destination').eql('Lagos');
        res.body.should.have.property('owner_id');
        res.body.should.have.property('created_date');
        res.body.should.have.property('price').eql(10350);
        res.body.should.have.property('weight').eql(23);
        res.body.should.have.property('status');
        done();
      });
  });
  // Admin authentification test
  it('it should not change the status with malformed token', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .set('x-access-token', 'wyeucbnbcidncjdncjdndjvbldnkancdnckdn')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('jwt malformed');
        done();
      });
  });
  it('it should not change the status with invalid token', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjA1ZWYwNTBhLWVlNzItNGY5My04Mjg4LWI5Y2I0ZjFjNDQwNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQzNDc3Mjg4fQ._Ob4s70y8necNNf1ncXKc48Kuyhqs3z_q2tRCpUbm6E')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('invalid token');
        done();
      });
  });
});

describe('Admin only parcel', () => {
  let adminToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@sendit.com',
        password: 'admin'
      })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  it('it should not change the status with invalid id', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1223nvnvenivnisnjsdinvsinvisjns/status')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });
  it('it should change the status', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/status`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('origin').eql('Muhanga');
        res.body.should.have.property('destination').eql('Lagos');
        res.body.should.have.property('owner_id');
        res.body.should.have.property('created_date');
        res.body.should.have.property('price').eql(10350);
        res.body.should.have.property('weight').eql(23);
        res.body.should.have.property('status');
        done();
      });
  });
  // change the present Location
  it('it should not change the destination with malformed token', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/presentLocation`)
      .set('x-access-token', 'wyeucbnbcidncjdncjdndjvbldnkancdnckdn')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('jwt malformed');
        done();
      });
  });
  it('it should not change the destination with invalid token', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/presentLocation`)
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjA1ZWYwNTBhLWVlNzItNGY5My04Mjg4LWI5Y2I0ZjFjNDQwNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQzNDc3Mjg4fQ._Ob4s70y8necNNf1ncXKc48Kuyhqs3z_q2tRCpUbm6E')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('invalid token');
        done();
      });
  });
  it('it should change the presentLocation', (done) => {
    chai.request(app)
      .put(`/api/v1/parcels/${parcelId}/presentLocation`)
      .set('x-access-token', adminToken)
      .send({ location: 'Uganda' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('origin').eql('Muhanga');
        res.body.should.have.property('destination').eql('Lagos');
        res.body.should.have.property('owner_id');
        res.body.should.have.property('created_date');
        res.body.should.have.property('present_location').eql('Uganda');
        res.body.should.have.property('price').eql(10350);
        res.body.should.have.property('weight').eql(23);
        res.body.should.have.property('status');
        done();
      });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';

import app from '../app';

chai.should();
chai.use(chaiHttp);
// Test error 404
describe('Error 404 test', () => {
  it('it should handle error 404', (done) => {
    chai.request(app)
      .get('/notexist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
// Testing create parcel
describe('Parcel Routes Test', () => {
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
        res.body.should.have.property('id');
        res.body.should.have.property('origin').eql('Muhanga');
        res.body.should.have.property('destination').eql('Kigali');
        res.body.should.have.property('owner_id');
        res.body.should.have.property('present_location').eql('Muhanga');
        res.body.should.have.property('created_date');
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
        done();
      });
  });
  // Testing getting one parcel delivery order
  it('it should get one parcel', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/62cef386-6c2c-4b29-b1b1-1842b115a4c3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('origin');
        res.body.should.have.property('destination');
        res.body.should.have.property('owner_id');
        res.body.should.have.property('present_location');
        res.body.should.have.property('created_date');
        res.body.should.have.property('weight');
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
  // Testing Change Present Location
  it('it should change present location', (done) => {
    const data = {
      location: 'Australia'
    };
    chai.request(app)
      .put('/api/v1/parcels/62cef386-6c2c-4b29-b1b1-1842b115a4c3/change-location')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('origin');
        res.body.should.have.property('destination');
        res.body.should.have.property('owner_id');
        res.body.should.have.property('present_location').eql('Australia');
        res.body.should.have.property('created_date');
        res.body.should.have.property('weight');
        done();
      });
  });
  it('it should not change present location', (done) => {
    const data = {
      location: 'Australia'
    };
    chai.request(app)
      .put('/api/v1/parcels/62cef386-6c2c-4b29-b1b1-1842b115a4c5/change-location')
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('parcel not found');
        done();
      });
  });
});

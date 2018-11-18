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
});

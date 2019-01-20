import chai from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import Database from '../db/database';

import app from '../app';

chai.should();
chai.use(chaiHttp);
let parcelId;
let userToken;
// Testing create parcel
describe('Parcel Routes Test', () => {
  let userId;
  before((done) => {
    chai.request(app);
    Database.createAdmin();
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jennah@sendit.com',
        password: 'jennah12',
        firstName: 'Jennah',
        lastName: 'Haque'
      })
      .end((err, res) => {
        userToken = res.body.token;
        userId = res.body.user.id;
        done();
      });
  });
  describe('Create Parcel Test', () => {
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
  });

  describe('Change Destination Test', () => {
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
  });
  describe('Get Parcels for One User', () => {
    it('it should get all parcels for provided user id', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${userId}/parcels`)
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Cancel a parcel delivery order', () => {
    it('it should get cancel parcel for provided parcel id', (done) => {
      chai.request(app)
        .put(`/api/v1/parcels/${parcelId}/cancel`)
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
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
  describe('Change Status Test', () => {
    // change status
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
    it('it should not change status with invalid id', (done) => {
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
  // change the present Location
  describe('Change Present Location Test', () => {
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
    it('it should not change the present loacation with invalid token', (done) => {
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
    it('it should not change the present location with user token', (done) => {
      chai.request(app)
        .put(`/api/v1/parcels/${parcelId}/presentLocation`)
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Not authorized???');
          done();
        });
    });
  });

  // Testing getting all parcel delivery order
  describe('Get All Parcel Test', () => {
    it('it should get all parcel', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('it should not get all parcel without token', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Not authorized!');
          done();
        });
    });

    it('it should not get all parcel with invalid token', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjA1ZWYwNTBhLWVlNzItNGY5My04Mjg4LWI5Y2I0ZjFjNDQwNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQzNDc3Mjg4fQ._Ob4s70y8necNNf1ncXKc48Kuyhqs3z_q2tRCpUbm6E')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('invalid token');
          done();
        });
    });

    it('it should not get all parcel with user token', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Not authorized');
          done();
        });
    });

    it('it should not get all parcel with malformed token', (done) => {
      chai.request(app)
        .get('/api/v1/parcels')
        .set('x-access-token', '1234rfyhfhsf')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('jwt malformed');
          done();
        });
    });
  });
  // Get One Parcel Test
  describe('Get One Parcel Test', () => {
    it('it should get one parcel', (done) => {
      chai.request(app)
        .get(`/api/v1/parcels/${parcelId}/`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
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

    it('it should not get one parcel with malformed id', (done) => {
      chai.request(app)
        .get('/api/v1/parcels/1223nvnvenivnisnjsdinvsinvisjns/')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(520);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('OOPS!!! something went wrong!!!');
          done();
        });
    });

    it('it should not get one parcel with invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/parcels/fd468711-0963-46f9-91a3-99488fb7df80/')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('parcel not found');
          done();
        });
    });

    it('it should not get one parcel without token', (done) => {
      chai.request(app)
        .get(`/api/v1/parcels/${parcelId}/`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Not authorized!');
          done();
        });
    });

    it('it should not get one parcel with invalid token', (done) => {
      chai.request(app)
        .get(`/api/v1/parcels/${parcelId}`)
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjA1ZWYwNTBhLWVlNzItNGY5My04Mjg4LWI5Y2I0ZjFjNDQwNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQzNDc3Mjg4fQ._Ob4s70y8necNNf1ncXKc48Kuyhqs3z_q2tRCpUbm6E')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('invalid token');
          done();
        });
    });

    it('it should not get one parcel with malformed token', (done) => {
      chai.request(app)
        .put(`/api/v1/parcels/${parcelId}/`)
        .set('x-access-token', 'wyeucbnbcidncjdncjdndjvbldnkancdnckdn')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('jwt malformed');
          done();
        });
    });
  });
});
describe('Parcel Test', () => {
  describe('Delete Parcel Test', () => {
    it('it should delete parcel', (done) => {
      chai.request(app)
        .delete(`/api/v1/parcels/${parcelId}`)
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should not delete parcel when it is not present', (done) => {
      chai.request(app)
        .delete(`/api/v1/parcels/${parcelId}`)
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('parcel not found');
          done();
        });
    });
  });
});

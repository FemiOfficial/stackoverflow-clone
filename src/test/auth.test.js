/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import userServices from '../services/user.services';

chai.use(chaiHttp);
const { expect } = chai;

const test_email = 'test@email.com';

userServices.deleteUserByEmail(test_email);

describe('User Registration Endpoint', () => {
  const userData = {
    validReg: {
      firstname: 'Jane',
      lastname: 'Doe',
      channel: 'web',
      email: test_email,
      pin: '2345',
      password: 'thetestpwd',
      mobile: '2348133849384',
      username: 'jane',
    },
    invalidPhone: {
      firstname: 'Jane',
      lastname: 'Doe',
      channel: 'web',
      email: 'janedoe@iisysgroup.com',
      pin: '2345',
      password: 'thetestpwd',
      mobile: '08133849384',
      username: 'jane',
    },
    reg409: {
      firstname: 'Jane',
      lastname: 'Afolabi',
      channel: 'web',
      email: 'janedoe@iisysgroup.com',
      pin: '2345',
      password: 'thetestpwd',
      mobile: '08133849384',
      username: 'jane',
    },
    reg400_1: {
      firstname: '',
      lastname: '',
      channel: '',
      email: 'rrrr@@@email.com',
    },
    reg400_2: {
      firstname: 'doe',
      lastname: null,
      channel: null,
      email: 'rrrr@email.com',
      mobile: '8786864',
    },
    reg400_3: {
      firstname: 'bless',
      lastname: null,
      channel: null,
      email: 'rr@rr@email.com',
      mobile: '8786864',
    },
  };
  describe('POST /v1/auth/register', () => {
    it('create a new user and send activation code to user\'s email', (done) => {
      chai.request(app)
        .post('/v1/auth/register')
        .send(userData.validReg)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('data');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('returns an error for duplicate email on registration', (done) => {
      chai.request(app)
        .post('/v1/auth/register')
        .send(userData.reg409)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('returns an error for invalid phone number', (done) => {
      chai.request(app)
        .post('/v1/auth/register')
        .send(userData.invalidPhone)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('throws error for invalid payload including email validation', (done) => {
      chai.request(app)
        .post('/v1/auth/register')
        .send(userData.reg400_1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('throws error for invalid payload including mobile number validation', (done) => {
      chai.request(app)
        .post('/v1/auth/register')
        .send(userData.reg400_2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('throws error for invalid payload including email and mobile number validtion', (done) => {
      chai.request(app)
        .post('/v1/auth/register')
        .send(userData.reg400_3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});

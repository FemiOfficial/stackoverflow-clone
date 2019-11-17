/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { deleteUserByUsername } from '../services/user.services';

chai.use(chaiHttp);
const { expect } = chai;

deleteUserByUsername('bossmen33');

describe('User Authentication Endpoints [Login and Signup]', () => {
  const testcases = {
    validReg: {
      username: 'bossmen33',
      password: 'rartyt2018',
      githubUsername: 'femiofficial',
      email: 'test33@gmail.com',
    },
    validSignIn: {
      username: 'bossmen33',
      password: 'rartyt2018',
    },
    invalidSignIn: {
      username: 'bossmen33',
      password: 'rartyt2018uuy',
    },
    invalidUsername: {
      username: 'rubbish',
      password: 'rartyt2018uuy',
    },
    reg409: {
      username: 'bossmantestcase',
      password: 'rartyt2018',
      githubUsername: 'femi111',
      email: 'test33@gmail.com',
    },
    reg409_2: {
      username: 'bossmen33',
      password: 'rartyt2018',
      githubUsername: 'femi111',
      email: 'testing@gmail.com',
    },
    invalidEmail: {
      username: 'bossmen33',
      password: 'rartyt2018',
      githubUsername: 'femiofficial',
      email: 'test3   hdhfgf 3@gmail.com',
    },
    invalidPassword: {
      username: 'bossmen33',
      password: 'rartyt',
      githubUsername: 'femiofficial',
      email: 'test33@gmail.com',
    },
    reg400_1: {
      username: 'bossmen33',
      password: 'rartyt2018',
      email: 'test33@gmail.com',
    },
  };
  describe('POST /v1/auth/signup', () => {
    it('create a new user', (done) => {
      chai.request(app)
        .post('/v1/auth/signup')
        .send(testcases.validReg)
        .end((err, res) => {
          expect(res.status).to.eqls(201);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('data');
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.eqls(201);
          done();
        });
    });
    it('returns an error for duplicate email on registration', (done) => {
      chai.request(app)
        .post('/v1/auth/signup')
        .send(testcases.reg409)
        .end((err, res) => {
          expect(res.status).to.eqls(409);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('email already taken');
          expect(res.body.status).to.eqls(409);
          done();
        });
    });
    it('returns an error for duplicate username', (done) => {
      chai.request(app)
        .post('/v1/auth/signup')
        .send(testcases.reg409_2)
        .end((err, res) => {
          expect(res.status).to.eqls(409);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('username already taken');
          expect(res.body.status).to.eqls(409);
          done();
        });
    });
    it('throws error for invalid payload', (done) => {
      chai.request(app)
        .post('/v1/auth/signup')
        .send(testcases.reg400_1)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
          expect(res.body.status).to.eqls(400);
          expect(res.body.error).to.be.an('array');
          done();
        });
    });
    it('throws error for invalid payload including email validation error', (done) => {
      chai.request(app)
        .post('/v1/auth/signup')
        .send(testcases.invalidEmail)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
          expect(res.body.status).to.eqls(400);
          expect(res.body.error).to.be.an('array');
          done();
        });
    });
    it('throws error for invalid payload', (done) => {
      chai.request(app)
        .post('/v1/auth/signup')
        .send(testcases.invalidPassword)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
          expect(res.body.status).to.eqls(400);
          expect(res.body.error).to.be.an('array');

          done();
        });
    });
    it('should log user in successfully', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send(testcases.validSignIn)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.eqls('user login sucessfully');
          expect(res.body.status).to.eqls(200);

          done();
        });
    });
    it('throws error with invalid password', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send(testcases.invalidSignIn)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('Invalid password');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('throws error with invalid username', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send(testcases.invalidUsername)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('Invalid username');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('throws error with invalid login request payload', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send({})
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
          expect(res.body.status).to.eqls(400);
          expect(res.body.error).to.be.an('array');

          done();
        });
    });
  });
});

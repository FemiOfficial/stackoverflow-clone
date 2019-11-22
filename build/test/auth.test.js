'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _user = require('../services/user.services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;


describe('User Authentication Endpoints [Login and Signup]', function () {
  var testcases = {
    validReg: {
      username: 'bossmen33',
      password: 'rartyt2018',
      githubUsername: 'femiofficial',
      email: 'test33@gmail.com'
    },
    validReg2: {
      username: 'maintest',
      password: 'rartyt2018',
      githubUsername: 'femiofficial',
      email: 'maintest@email.com'
    },
    validSignIn: {
      username: 'bossmen33',
      password: 'rartyt2018'
    },
    invalidSignIn: {
      username: 'bossmen33',
      password: 'rartyt2018uuy'
    },
    invalidUsername: {
      username: 'rubbish',
      password: 'rartyt2018uuy'
    },
    reg409: {
      username: 'bossmantestcase',
      password: 'rartyt2018',
      githubUsername: 'femi111',
      email: 'test33@gmail.com'
    },
    reg409_2: {
      username: 'bossmen33',
      password: 'rartyt2018',
      githubUsername: 'femi111',
      email: 'testing@gmail.com'
    },
    invalidEmail: {
      username: 'bossmen33',
      password: 'rartyt2018',
      githubUsername: 'femiofficial',
      email: 'test3   hdhfgf 3@gmail.com'
    },
    invalidPassword: {
      username: 'bossmen33',
      password: 'rartyt',
      githubUsername: 'femiofficial',
      email: 'test33@gmail.com'
    },
    reg400_1: {
      username: 'bossmen33',
      password: 'rartyt2018',
      email: 'test33@gmail.com'
    }
  };

  (0, _user.deleteUserByUsername)('bossmen33');

  (0, _user.deleteUserByUsername)('maintest');

  describe('POST /v1/auth/signup && /v1/auth/signin', function () {
    it('throws error with invalid username', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.validReg).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Invalid username');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('create a new user', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.validReg).end(function (err, res) {
        expect(res.status).to.eqls(201);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(201);
        done();
      });
    });
    it('create another new user', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.validReg2).end(function (err, res) {
        expect(res.status).to.eqls(201);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(201);
        done();
      });
    });
    it('returns an error for duplicate email on registration', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.reg409).end(function (err, res) {
        expect(res.status).to.eqls(409);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('email already taken');
        expect(res.body.status).to.eqls(409);
        done();
      });
    });
    it('returns an error for duplicate username', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.reg409_2).end(function (err, res) {
        expect(res.status).to.eqls(409);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('username already taken');
        expect(res.body.status).to.eqls(409);
        done();
      });
    });
    it('throws error for invalid payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.reg400_1).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');
        done();
      });
    });
    it('throws error for invalid payload including email validation error', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.invalidEmail).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');
        done();
      });
    });
    it('throws error for invalid payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signup').send(testcases.invalidPassword).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');

        done();
      });
    });
    it('should log user in successfully', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.validSignIn).end(function (err, res) {
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
    it('throws error with invalid password', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.invalidSignIn).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Invalid password');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('throws error with invalid username', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.invalidUsername).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Invalid username');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('throws error with invalid login request payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send({}).end(function (err, res) {
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
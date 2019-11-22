'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _question = require('../services/question.services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
(0, _question.deleteQuestionByTAG)('angular');

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;


describe('Questions Endpoints [POST(ask) and GET(view)]', function () {
  var authorization = void 0;
  var authorization2 = void 0;
  var testquestion = void 0;

  var testcases = {
    validSignIn: {
      username: 'bossmen33',
      password: 'rartyt2018'
    },
    validSignIn2: {
      username: 'maintest',
      password: 'rartyt2018'
    },
    validQuestion: {
      title: 'AngularJS',
      tags: ['controllers', 'angular'],
      body: 'This is the body of my question?'
    },
    invalidtag: {
      title: 'VueJs',
      tags: [8, false, 'random'],
      body: 'This is the body of my question?'
    },
    invalidtag_2: {
      title: 'Nodejs',
      tags: 'tech',
      body: 'This is the body of my question?'
    },
    invalidpayload: {
      body: 'This is the body of my question?'
    }

  };
  describe('POST /v1/auth/signin', function () {
    it('should log user1 in successfully', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.validSignIn).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');

        authorization = res.body.token;

        expect(res.body).to.have.property('data');
        expect(res.body.message).to.eqls('user login sucessfully');
        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should log user2 in successfully', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.validSignIn2).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');

        authorization2 = res.body.token;
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.eqls('user login sucessfully');
        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('POST /v1/questions/ask', function () {
    it('should upload question successfully', function (done) {
      _chai2.default.request(_app2.default).post('/v1/questions/ask').send(testcases.validQuestion).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body).to.have.property('data');
        expect(res.body.message).to.eqls('Question uploaded successfully');
        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw error for authorization token validation', function (done) {
      _chai2.default.request(_app2.default).post('/v1/questions/ask').send(testcases.validQuestion).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw error for invalid tag (number and boolean but expecting an array of string) sent with payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/questions/ask').send(testcases.invalidtag).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');

        done();
      });
    });

    it('should throw error for invalid tag (string but expecting an array of string) sent with payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/questions/ask').send(testcases.invalidtag_2).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');

        done();
      });
    });

    it('should throw error for invalid tag (string but expecting an array of string) sent with payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/questions/ask').send(testcases.invalidpayload).set('authorization', authorization).end(function (err, res) {
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

  describe('GET /v1/questions', function () {
    it('should throw error for authorization token', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should GET all question sucessfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body).to.have.property('data');

        expect(res.body.data).to.be.an('array');

        expect(res.body.message).to.eqls('All Questions');
        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('GET /v1/questions/bytag/:tag', function () {
    it('should throw error for authorization token', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/bytag/angular').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should GET question by TAG sucessfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/bytag/angular').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        testquestion = res.body.data[0];

        expect(res.body).to.have.property('data');

        expect(res.body.data).to.be.an('array');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw a not found error for question TAG not added yet ', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/bytag/justnonsense').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(404);

        done();
      });
    });
  });

  describe('GET /v1/questions/byid/:id', function () {
    it('should throw error for authorization token', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/byid/' + testquestion._id).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should GET question by Id sucessfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/byid/' + testquestion._id).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body).to.have.property('data');

        expect(res.body.data).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw a not found error for question Id not added yet ', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/byid/657hdhfhdhsgsgs').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(500);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(500);

        done();
      });
    });
  });

  describe('PATCH /v1/questions/vote/:questionid/:action', function () {
    it('should throw error for invalid request parameter', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/vote/' + testquestion._id + '/random').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('invalid action parameter (up or down vote actions))');
        expect(res.body.status).to.eqls(400);
        done();
      });
    });

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/vote/' + testquestion._id + '/up').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should upvote an question successfully', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/vote/' + testquestion._id + '/up').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should downvote an question successfully', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/vote/' + testquestion._id + '/down').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw an error for invalid questionid', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/vote/5653t3t3522g/up').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(404);

        done();
      });
    });
  });

  describe('GET /v1/questions/byuser', function () {
    it('should successfully get questions by user', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/byuser').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/byuser').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });
  });

  describe('GET /v1/questions/search', function () {
    it('should throw error for invalid request parameter', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/search').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');

        done();
      });
    });

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/search').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should search for question successfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/questions/search').set('authorization', authorization).send({ question: testcases.validQuestion.body }).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('PATCH /v1/questions/:action/:questionid/', function () {
    it('should throw error for invalid request parameter', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/notsubscribe/' + testquestion._id).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('invalid request parameter (subscribe or unsubscribe)');
        expect(res.body.status).to.eqls(400);
        done();
      });
    });

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/subscribe/' + testquestion._id).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw for invalid user trying to subscribe to notification', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/unsubscribe/' + testquestion._id).set('authorization', authorization2).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(400);

        expect(res.body.message).to.eqls('invalid user, only user that ask question can request subscription');

        done();
      });
    });

    it('should unsubscribe from a question successfully', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/unsubscribe/' + testquestion._id).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw a conflicting data error', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/unsubscribe/' + testquestion._id).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(409);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(409);

        done();
      });
    });

    it('should subscribe to question successfully', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/subscribe/' + testquestion._id).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw an error for invalid questionid', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/unsubscribe/5653t3t3522g').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(500);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(500);

        done();
      });
    });
  });

  describe('DELETE /v1/questions/:questionid/', function () {

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/questions/' + testquestion._id).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw for invalid user trying to delete a question', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/questions/' + testquestion._id).set('authorization', authorization2).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(400);

        expect(res.body.message).to.eqls('invalid user, only user that ask question can delete');

        done();
      });
    });

    it('should delete a question successfully', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/questions/' + testquestion._id).set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw an error for invalid questionid', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/questions/unsubscribe/5653t3t3522g').set('authorization', authorization).end(function (err, res) {
        expect(res.status).to.eqls(500);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(500);

        done();
      });
    });
  });
});
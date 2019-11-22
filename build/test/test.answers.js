'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _question = require('../services/question.services');

var _answers = require('../services/answers.services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default); /* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
var expect = _chai2.default.expect;


describe('Answers Endpoints', function () {
  var user1Authorization = void 0;
  var user2Authorization = void 0;
  var testquestion = void 0;
  var testanswer = void 0;

  var testcases = {
    user1: {
      username: 'bossmen33',
      password: 'rartyt2018'
    },
    user2: {
      username: 'maintest',
      password: 'rartyt2018'
    },
    validQuestion: {
      title: 'NodeJS',
      tags: ['controllers', 'express', 'answertest'],
      body: 'How do i create a rest api with nodejs?'
    },
    validAnswer: {
      body: 'read the documentation and learn from online courses'
    }
  };

  (0, _question.deleteQuestionByTAG)(testcases.validQuestion.tags[2]);
  (0, _answers.deleteAnswerByBody)(testcases.validAnswer.body);

  describe('POST /v1/auth/signin', function () {
    it('should sign user1 in', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.user1).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('token');

        user1Authorization = res.body.token;
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(200);
        done();
      });
    });

    it('should sign user2 in', function (done) {
      _chai2.default.request(_app2.default).post('/v1/auth/signin').send(testcases.user2).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('token');

        user2Authorization = res.body.token;
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(200);
        done();
      });
    });
  });

  describe('POST /v1/questions/ask', function () {
    it('should post new question successfully', function (done) {
      _chai2.default.request(_app2.default).post('/v1/questions/ask').send(testcases.validQuestion).set('authorization', user2Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        testquestion = res.body.data;

        done();
      });
    });
  });

  describe('POST /v1/answers/post/:questionid', function () {
    it('should throw error for invalid request payload', function (done) {
      _chai2.default.request(_app2.default).post('/v1/answers/post/' + testquestion.id).send({}).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('Incomplete(Invalid) Request Payload');
        expect(res.body.status).to.eqls(400);
        expect(res.body.error).to.be.an('array');

        done();
      });
    });

    it('should throw error for token authorization not provided', function (done) {
      _chai2.default.request(_app2.default).post('/v1/answers/post/' + testquestion.id).send(testcases.validAnswer).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw error for invalid question id', function (done) {
      _chai2.default.request(_app2.default).post('/v1/answers/post/5dd19f8eb4d2f643ccd457b3').send(testcases.validAnswer).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('invalid question id');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should post answer successfully', function (done) {
      _chai2.default.request(_app2.default).post('/v1/answers/post/' + testquestion.id).send(testcases.validAnswer).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('Answer posted successfully');
        expect(res.body.status).to.eqls(200);

        testanswer = res.body.data;

        done();
      });
    });
  });

  describe('PATCH /v1/answers/accept/:answerid', function () {
    it('should throw error stating users can only accept question asked personally', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/accept/' + testanswer._id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('users can only accept question asked personally');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should successfully accept answer', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/accept/' + testanswer._id).set('authorization', user2Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('PATCH /v1/vote/:answerid/:action', function () {
    it('should throw error for invalid request parameter', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/vote/' + testanswer._id + '/random').set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eqls('invalid action parameter (up or down vote actions))');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/vote/' + testanswer._id + '/up').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should upvote an answer successfully', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/vote/' + testanswer._id + '/up').set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should downvote an answer successfully', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/vote/' + testanswer._id + '/down').set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw an error for invalid answerid', function (done) {
      _chai2.default.request(_app2.default).patch('/v1/answers/vote/55464dgfgdgdfg/down').set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(500);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(500);

        done();
      });
    });
  });

  describe('GET /v1/answers/:answerid', function () {
    it('should throw error for invalid request parameter', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/67464638363637').set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(500);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(500);

        done();
      });
    });

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/67464638363637').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should get answer by id successfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/' + testanswer._id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('GET /v1/answers/byquestion/all/:questionid', function () {

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/byquestion/all/67464638363637').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw error for no answer found', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/byquestion/all/' + testanswer._id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(404);
        expect(res.body).to.have.property('message');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(404);

        done();
      });
    });

    it('should get all answers with questionid successfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/byquestion/all/' + testquestion.id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('GET /v1/answers/byquestion/accepted/:questionid', function () {

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/byquestion/accepted/67464638363637').end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw error for no answer found', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/byquestion/accepted/' + testanswer._id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(404);
        expect(res.body).to.have.property('message');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(404);

        done();
      });
    });

    it('should get accepted answers by questionid successfully', function (done) {
      _chai2.default.request(_app2.default).get('/v1/answers/byquestion/accepted/' + testquestion.id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });
  });

  describe('DELETE /v1/answers/:answerid/', function () {

    it('should throw error for token authorization', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/answers/' + testanswer._id).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');

        expect(res.body.message).to.eqls('token must be provided');
        expect(res.body.status).to.eqls(400);

        done();
      });
    });

    it('should throw for invalid user trying to delete a question', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/answers/' + testanswer._id).set('authorization', user2Authorization).end(function (err, res) {
        expect(res.status).to.eqls(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eqls(400);

        expect(res.body.message).to.eqls('invalid user, only user that answered can delete');

        done();
      });
    });

    it('should delete a answer successfully', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/answers/' + testanswer._id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(200);
        expect(res.body).to.have.property('message');

        expect(res.body).to.be.an('object');

        expect(res.body.status).to.eqls(200);

        done();
      });
    });

    it('should throw an error for invalid answerid', function (done) {
      _chai2.default.request(_app2.default).delete('/v1/answers/' + testquestion.id).set('authorization', user1Authorization).end(function (err, res) {
        expect(res.status).to.eqls(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');

        expect(res.body.message).to.eqls('invalid answer id (not found)');

        expect(res.body.status).to.eqls(404);

        done();
      });
    });
  });
});
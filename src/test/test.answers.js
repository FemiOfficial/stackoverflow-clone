/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { getQuestionById, deleteQuestionByTAG } from '../services/question.services';
import { deleteAnswerByBody } from '../services/answers.services';

chai.use(chaiHttp);
const { expect } = chai;


describe('Answers Endpoints', () => {
  let user1Authorization;
  let user2Authorization;
  let testquestion;
  let testanswer;

  const testcases = {
    user1: {
      username: 'bossmen33',
      password: 'rartyt2018',
    },
    user2: {
      username: 'maintest',
      password: 'rartyt2018',
    },
    validQuestion: {
      title: 'NodeJS',
      tags: ['controllers', 'express', 'answertest'],
      body: 'How do i create a rest api with nodejs?',
    },
    validAnswer: {
      body: 'read the documentation and learn from online courses',
    }
  };

  deleteQuestionByTAG(testcases.validQuestion.tags[2]);
  deleteAnswerByBody(testcases.validAnswer.body);


  describe('POST /v1/auth/signin', () => {
    it('should sign user1 in', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send(testcases.user1)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('token');

          user1Authorization = res.body.token;
          expect(res.body).to.have.property('data');
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.eqls(200);
          done();
        });
    });

    it('should sign user2 in', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send(testcases.user2)
        .end((err, res) => {
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

  describe('POST /v1/questions/ask', () => {
    it('should post new question successfully', (done) => {
      chai.request(app)
        .post('/v1/questions/ask')
        .send(testcases.validQuestion)
        .set('authorization', user2Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          testquestion = res.body.data;

          done();
        });
    });
  });

  describe('POST /v1/answers/post/:questionid', () => {
    it('should throw error for invalid request payload', (done) => {
      chai.request(app)
        .post(`/v1/answers/post/${testquestion.id}`)
        .send({})
        .set('authorization', user1Authorization)
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

    it('should throw error for token authorization not provided', (done) => {
      chai.request(app)
        .post(`/v1/answers/post/${testquestion.id}`)
        .send(testcases.validAnswer)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should throw error for invalid question id', (done) => {
      chai.request(app)
        .post('/v1/answers/post/5dd19f8eb4d2f643ccd457b3')
        .send(testcases.validAnswer)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('invalid question id');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should post answer successfully', (done) => {
      chai.request(app)
        .post(`/v1/answers/post/${testquestion.id}`)
        .send(testcases.validAnswer)
        .set('authorization', user1Authorization)
        .end((err, res) => {
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

  describe('PATCH /v1/answers/accept/:answerid', () => {
    it('should throw error stating users can only accept question asked personally', (done) => {
      chai.request(app)
        .patch(`/v1/answers/accept/${testanswer._id}`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('users can only accept question asked personally');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should successfully accept answer', (done) => {
      chai.request(app)
        .patch(`/v1/answers/accept/${testanswer._id}`)
        .set('authorization', user2Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');

          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(200);

          done();
        });
    });
  });

  describe('PATCH /v1/vote/:answerid/:action', () => {
    it('should throw error for invalid request parameter', (done) => {
      chai.request(app)
        .patch(`/v1/answers/vote/${testanswer._id}/random`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.eqls('invalid action parameter (up or down vote actions))');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should throw error for token authorization', (done) => {
      chai.request(app)
        .patch(`/v1/answers/vote/${testanswer._id}/up`)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should upvote an answer successfully', (done) => {
      chai.request(app)
        .patch(`/v1/answers/vote/${testanswer._id}/up`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(200);

          done();
        });
    });

    it('should downvote an answer successfully', (done) => {
      chai.request(app)
        .patch(`/v1/answers/vote/${testanswer._id}/down`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(200);

          done();
        });
    });

    it('should throw an error for invalid answerid', (done) => {
      chai.request(app)
        .patch('/v1/answers/vote/55464dgfgdgdfg/down')
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(500);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(500);

          done();
        });
    });
  });

  describe('GET /v1/answers/:answerid', () => {
    it('should throw error for invalid request parameter', (done) => {
      chai.request(app)
        .get('/v1/answers/67464638363637')
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(500);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.eqls(500);

          done();
        });
    });

    it('should throw error for token authorization', (done) => {
      chai.request(app)
        .get('/v1/answers/67464638363637')
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should get answer by id successfully', (done) => {
      chai.request(app)
        .get(`/v1/answers/${testanswer._id}`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');

          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(200);

          done();
        });
    });
  });

  describe('GET /v1/answers/byquestion/all/:questionid', () => {

    it('should throw error for token authorization', (done) => {
      chai.request(app)
        .get('/v1/answers/byquestion/all/67464638363637')
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should throw error for no answer found', (done) => {
      chai.request(app)
        .get(`/v1/answers/byquestion/all/${testanswer._id}`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(404);
          expect(res.body).to.have.property('message');

          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(404);

          done();
        });
    });

    it('should get answers by questionid successfully', (done) => {
      chai.request(app)
        .get(`/v1/answers/byquestion/all/${testquestion.id}`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');

          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(200);

          done();
        });
    });
  });

  describe('GET /v1/answers/byquestion/accepted/:questionid', () => {

    it('should throw error for token authorization', (done) => {
      chai.request(app)
        .get('/v1/answers/byquestion/accepted/67464638363637')
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should throw error for no answer found', (done) => {
      chai.request(app)
        .get(`/v1/answers/byquestion/accepted/${testanswer._id}`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(404);
          expect(res.body).to.have.property('message');

          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(404);

          done();
        });
    });

    it('should get answers by questionid successfully', (done) => {
      chai.request(app)
        .get(`/v1/answers/byquestion/accepted/${testquestion.id}`)
        .set('authorization', user1Authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');

          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(200);

          done();
        });
    });
  });

});

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { deleteQuestionByTAG } from '../services/question.services';

deleteQuestionByTAG('angular');

chai.use(chaiHttp);
const { expect } = chai;


describe('Questions Endpoints [POST(ask) and GET(view)]', () => {
  let authorization;
  let testquestion;

  const testcases = {
    validSignIn: {
      username: 'bossmen33',
      password: 'rartyt2018',
    },
    validQuestion: {
      title: 'AngularJS',
      tags: ['controllers', 'angular'],
      body: 'This is the body of my question?',
    },
    invalidtag: {
      title: 'VueJs',
      tags: [8, false, 'random'],
      body: 'This is the body of my question?',
    },
    invalidtag_2: {
      title: 'Nodejs',
      tags: 'tech',
      body: 'This is the body of my question?',
    },
    invalidpayload: {
      body: 'This is the body of my question?',
    },

  };
  describe('POST /v1/auth/signin', () => {
    it('should log user in successfully', (done) => {
      chai.request(app)
        .post('/v1/auth/signin')
        .send(testcases.validSignIn)
        .end((err, res) => {
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
  });

  describe('POST /v1/questions/ask', () => {
    it('should upload question successfully', (done) => {
      chai.request(app)
        .post('/v1/questions/ask')
        .send(testcases.validQuestion)
        .set('authorization', authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body).to.have.property('data');
          expect(res.body.message).to.eqls('Question uploaded successfully');
          expect(res.body.status).to.eqls(200);

          done();
        });
    });

    it('should throw error for authorization token validation', (done) => {
      chai.request(app)
        .post('/v1/questions/ask')
        .send(testcases.validQuestion)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should throw error for invalid tag (number and boolean but expecting an array of string) sent with payload', (done) => {
      chai.request(app)
        .post('/v1/questions/ask')
        .send(testcases.invalidtag)
        .set('authorization', authorization)
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

    it('should throw error for invalid tag (string but expecting an array of string) sent with payload', (done) => {
      chai.request(app)
        .post('/v1/questions/ask')
        .send(testcases.invalidtag_2)
        .set('authorization', authorization)
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

    it('should throw error for invalid tag (string but expecting an array of string) sent with payload', (done) => {
      chai.request(app)
        .post('/v1/questions/ask')
        .send(testcases.invalidpayload)
        .set('authorization', authorization)
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

  describe('GET /v1/questions', () => {
    it('should throw error for authorization token', (done) => {
      chai.request(app)
        .get('/v1/questions')
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should GET all question sucessfully', (done) => {
      chai.request(app)
        .get('/v1/questions')
        .set('authorization', authorization)
        .end((err, res) => {
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

  describe('GET /v1/questions/bytag/:tag', () => {
    it('should throw error for authorization token', (done) => {
      chai.request(app)
        .get('/v1/questions/bytag/angular')
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should GET question by TAG sucessfully', (done) => {
      chai.request(app)
        .get('/v1/questions/bytag/angular')
        .set('authorization', authorization)
        .end((err, res) => {
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

    it('should throw a not found error for question TAG not added yet ', (done) => {
      chai.request(app)
        .get('/v1/questions/bytag/justnonsense')
        .set('authorization', authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(404);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(404);

          done();
        });
    });
  });

  describe('GET /v1/questions/byid/:id', () => {
    it('should throw error for authorization token', (done) => {
      chai.request(app)
        .get(`/v1/questions/byid/${testquestion._id}`)
        .end((err, res) => {
          expect(res.status).to.eqls(400);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.message).to.eqls('token must be provided');
          expect(res.body.status).to.eqls(400);

          done();
        });
    });

    it('should GET question by Id sucessfully', (done) => {
      chai.request(app)
        .get(`/v1/questions/byid/${testquestion._id}`)
        .set('authorization', authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body).to.have.property('data');

          expect(res.body.data).to.be.an('object');


          expect(res.body.status).to.eqls(200);

          done();
        });
    });

    it('should throw a not found error for question Id not added yet ', (done) => {
      chai.request(app)
        .get('/v1/questions/byid/657hdhfhdhsgsgs')
        .set('authorization', authorization)
        .end((err, res) => {
          expect(res.status).to.eqls(500);
          expect(res.body).to.have.property('message');
          expect(res.body).to.be.an('object');

          expect(res.body.status).to.eqls(500);

          done();
        });
    });
  });
});

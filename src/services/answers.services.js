import AnswerModel from '../db/models/answers.model';
import { updateAnsweredStatus } from './question.services';

class AnswerServices {
  async saveAnswer(user, question, answer) {
    const newAnswer = {
      question,
      user: {
        username: user.username,
        githubUsername: user.githubUsername,
        email: user.email,
        id: user.id,
      },
      body: answer.body,
    };

    const answermodel = new AnswerModel(newAnswer);
    answermodel.question.answered = true;

    updateAnsweredStatus(answermodel.question._id);

    return new Promise((resolve, reject) => {
      answermodel.save((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  async acceptAnswer(id) {
    return new Promise((resolve, reject) => {
      AnswerModel.findById(id, (err, doc) => {
        if (err) reject(err);

        doc.accepted = true;
        doc.save();
        resolve(doc);
      });
    });
  }

  getAnswerById(id) {
    return new Promise((resolve, reject) => {
      AnswerModel.findById(id, (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  viewAnswerById(id) {
    return new Promise((resolve, reject) => {
      AnswerModel.findById(id, '-_id question user body accepted vote_count', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  viewAnswersByQuestionIdAnswered(questionid) {
    return new Promise((resolve, reject) => {
      AnswerModel.find(
        // { 'question._id': questionid },
        { 'question.answered': true },
        '-_id question user body accepted vote_count', (err, doc) => {
          if (err) reject(err);

          const answers = doc.filter((i) => i.question._id == questionid);
          resolve(answers);
        });
    });
  }

  viewAnswersByQuestionIdAccepted(questionid) {
    return new Promise((resolve, reject) => {
      AnswerModel.find({ accepted: true }, '-_id question user body accepted vote_count', (err, doc) => {
        if (err) reject(err);

        const answers = doc.filter((i) => i.question._id == questionid);

        resolve(answers);
      });
    });
  }

  upVoteAnswer(id) {
    return new Promise((resolve, reject) => {
      AnswerModel.findById(id, (err, doc) => {
        if (err) reject(err);
        doc.vote_count += 1;
        doc.save();
        resolve(doc);
      });
    });
  }

  downVoteAnswer(id) {
    return new Promise((resolve, reject) => {
      AnswerModel.findById(id, (err, doc) => {
        if (err) reject(err);
        if (doc.vote_count !== 0) {
          doc.vote_count -= 1;
        }
        doc.save();
        resolve(doc);
      });
    });
  }

  deleteAnswerByBody(body) {
    return new Promise((resolve, reject) => {
      AnswerModel.deleteMany({ body }, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
}

module.exports = new AnswerServices();

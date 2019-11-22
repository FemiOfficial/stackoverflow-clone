/* eslint-disable import/no-cycle */
import QuestionModel from '../db/models/questions.model';
import { getUserByUsernameAndReturnWithId } from './auth.services';
import { deleteAnswersByQuestionId } from './answers.services';

class QuestionServices {
  async saveQuestion(username, question) {
    const user = await getUserByUsernameAndReturnWithId(username);

    const newQuestion = {
      user,
      title: question.title,
      tags: question.tags,
      body: question.body,
    };

    const questionmodel = new QuestionModel(newQuestion);

    return new Promise((resolve, reject) => {
      questionmodel.save((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  getAllQuestions() {
    return new Promise((resolve, reject) => {
      QuestionModel.find({}, '_id user title body view_count answer_count subscribed answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  getAllQuestionsAskByUser(username) {
    return new Promise((resolve, reject) => {
      QuestionModel.find({ 'user.username': username }, '_id title body view_count answer_count subscribed answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  getQuestionByBody(body) {
    return new Promise((resolve, reject) => {
      QuestionModel.find({ body }, '_id user title body view_count answer_count subscribed answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  getQuestionsByTag(tag) {
    return new Promise((resolve, reject) => {
      QuestionModel.find({ tags: tag }, '_id user title body view_count subscribed answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  getQuestionById(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, '_id user title body view_count vote_count subscribed answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  viewQuestionById(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, '_id user title body view_count vote_count subscribed answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        if (doc === null || doc === undefined) {
          resolve(doc);
        } else {
          doc.view_count += 1;
          doc.save();
          resolve(doc);
        }
      });
    });
  }

  updateAnswer(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, (err, doc) => {
        if (err) reject(err);
        if (doc !== null || doc !== []) {
          doc.answer_count += 1;
          doc.answered = true;
          doc.save();
        }
        resolve(doc);
      });
    });
  }

  upVoteQuestion(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, (err, doc) => {
        if (err) reject(err);
        doc.vote_count += 1;
        doc.save();
        resolve(doc);
      });
    });
  }

  downVoteQuestion(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, (err, doc) => {
        if (err) reject(err);
        if (doc.vote_count !== 0) {
          doc.vote_count -= 1;
        }
        doc.save();
        resolve(doc);
      });
    });
  }

  deleteQuestionByTAG(tag) {
    return new Promise((resolve, reject) => {
      QuestionModel.findOneAndDelete({ tags: tag }, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }

  deleteQuestionById(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findOneAndDelete({ _id: id }, (error, response) => {
        if (error) reject(error);
        deleteAnswersByQuestionId(id);
        resolve(response);
      });
    });
  }

  subscribe(questionid) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(questionid, (error, doc) => {
        if (error) reject(error);
        doc.subscribed = true;
        doc.save();
        resolve(doc);
      });
    });
  }

  unsubscribe(questionid) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(questionid, (error, doc) => {
        if (error) reject(error);
        doc.subscribed = false;
        doc.save();
        resolve(doc);
      });
    });
  }
}

module.exports = new QuestionServices();

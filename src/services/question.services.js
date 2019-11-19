import QuestionModel from '../db/models/questions.model';
import { getUserByUsernameAndReturnWithId } from './auth.services';

class QuestionServices {
  async saveQuestion(username, question) {
    const user = await getUserByUsernameAndReturnWithId(username);

    // const tags = question.tags.map(i => { return i.toLowerCase(); });

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
      QuestionModel.find({}, '_id user title body view_count answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  // TODO: Search with regex
  getQuestionsByTag(tag) {
    return new Promise((resolve, reject) => {
      QuestionModel.find({ tags: tag }, '_id user title body view_count answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  getQuestionById(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, '_id user title body view_count vote_count answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }

  viewQuestionById(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, '_id user title body view_count vote_count answer_count answered tags ', (err, doc) => {
        if (err) reject(err);
        doc.view_count += 1;
        doc.save();
        resolve(doc);
      });
    });
  }

  updateAnswerCount(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, (err, doc) => {
        if (err) reject(err);
        doc.answer_count += 1;
        doc.save();
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

  updateAnsweredStatus(id) {
    return new Promise((resolve, reject) => {
      QuestionModel.findById(id, (err, doc) => {
        if (err) reject(err);

        doc.answered = true;

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
}
module.exports = new QuestionServices();

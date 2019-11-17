import AnswerModel from '../db/models/answers.model';
import { getUserByUsernameAndReturnWithId } from './auth.services';
import { getQuestionById } from './question.services';

class AnswerServices {
  async saveAnswer(username, questionid, answer) {
    const user = await getUserByUsernameAndReturnWithId(username);
    const question = await getQuestionById(questionid);

    const newAnswer = {
      question,
      user,
      body: answer,
    };

    const answermodel = new AnswerModel(newAnswer);

    return new Promise((resolve, reject) => {
      answermodel.save((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  }
}

module.exports = new AnswerServices();

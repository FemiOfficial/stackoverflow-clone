import QuestionModel from '../db/models/questions.model';
import { getUserByUsernameAndReturnWithId } from './auth.services';

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
      })
    });
  }

}
module.exports = new QuestionServices();
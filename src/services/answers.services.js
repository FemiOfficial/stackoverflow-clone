import AnswerModel from '../db/models/answers.model';

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

  viewAnswersByUser(username) {
    return new Promise((resolve, reject) => {
      AnswerModel.find({ 'user.username': username }, '-_id question user body accepted vote_count', (err, doc) => {
        if (err) reject(err);

        resolve(doc);
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

  deleteAnswersByQuestionId(questionid) {
    return new Promise((resolve, reject) => {
      AnswerModel.deleteMany({ 'question._id': questionid }, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }

  deleteAnswerById(answerid) {
    return new Promise((resolve, reject) => {
      AnswerModel.findByIdAndDelete(answerid, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }

}

module.exports = new AnswerServices();

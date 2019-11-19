import {
  saveAnswer, getAnswerById, acceptAnswer,
  upVoteAnswer, downVoteAnswer,
} from '../services/answers.services';
import { getQuestionById, updateAnswerCount } from '../services/question.services';
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import utils from '../helpers/utils';

class AnswerControllers {
  async postAnswer(request, response) {
    try {
      const { body } = request.body;
      const { questionid } = request.params;
      const user = utils.getUserFromToken(request);
      const question = await getQuestionById(questionid);

      if (question === null || question.length === 0) {
        return Response.handleError(response, codes.badRequest, 'invalid question id');
      }

      saveAnswer(user, question, body)
        .then((data) => {
          updateAnswerCount(question._id);

          return Response.success(response, codes.success, data, 'Answer posted successfully');
        })
        .catch((err) => Response.handleError(response, codes.serverError, err));
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  async acceptAnswer(request, response) {
    try {
      const { answerid } = request.params;
      const user = utils.getUserFromToken(request);
      const answer = await getAnswerById(answerid);

      if (user.username !== answer.question.user.username) {
        return Response.handleError(response, codes.badRequest, 'users can only accept question asked personally');
      }

      if (answer === null || answer === []) {
        return Response.handleError(response, codes.notFound, 'invalid answer id (not found)');
      }

      if (answer.accepted === true) {
        return Response.handleError(response, codes.conflict, 'answer has already been accepted');
      }

      acceptAnswer(answerid)
        .then((data) => Response.success(response, codes.success, data, 'answer accepted successfully'))
        .catch((err) => Response.handleError(response, codes.serverError, err));
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  async voteAnswer(request, response) {
    try {
      const { answerid, action } = request.params;

      const answer = await getAnswerById(answerid);

      if (answer === null || answer === []) {
        return Response.handleError(response, codes.notFound, 'invalid answer id (not found)');
      }

      if (action === 'up') {
        upVoteAnswer(answerid)
          .then((data) => Response.success(response, codes.success, data, `Answer with id: ${answerid}, voted up successfully`))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else if (action === 'down') {
        downVoteAnswer(answerid)
          .then((data) => Response.success(response, codes.success, data, `Answer with id: ${answerid}, voted up successfully`))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else {
        return Response.handleError(response, codes.badRequest, 'invalid action parameter (up or down vote actions))');
      }
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }
}

export default new AnswerControllers();

import {
  saveQuestion, getAllQuestions, getQuestionsByTag,
  viewQuestionById, upVoteQuestion, downVoteQuestion,
  getQuestionById,
} from '../services/question.services';

import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import utils from '../helpers/utils';

class QuestionController {
  handleAskQuestion(request, response) {
    try {
      const user = utils.getUserFromToken(request);

      saveQuestion(user.username, request.body)
        .then((doc) => {
          const data = {
            user: doc.user.username,
            title: doc.title,
            tags: doc.tags,
            body: doc.body,
            id: doc._id,
          };
          return Response.success(response, codes.success, data, 'Question uploaded successfully');
        })
        .catch((err) => Response.handleError(response, codes.serverError, err));
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  viewAllQuestions(request, response) {
    try {
      getAllQuestions()
        .then((data) => {
          if (data === null || data.length === 0) return Response.handleError(response, codes.notFound, 'No question added');

          return Response.success(response, codes.success, data, 'All Questions');
        })
        .catch((err) => Response.handleError(response, codes.serverError, err));
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  viewQuestionsWithATag(request, response) {
    try {
      const { tag } = request.params;

      getQuestionsByTag(tag)
        .then((data) => {
          if (data === null || data.length === 0) return Response.handleError(response, codes.notFound, `No question with tag: ${tag}`);

          return Response.success(response, codes.success, data, `All Questions with tag: ${tag}`);
        })
        .catch((err) => Response.handleError(response, codes.serverError, err));
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  viewQuestionById(request, response) {
    try {
      const { id } = request.params;
      viewQuestionById(id)
        .then((data) => {
          if (data === null || data.length === 0) return Response.handleError(response, codes.notFound, `No question with id: ${id}`);
          return Response.success(response, codes.success, data, `Question with id: ${id}`);
        })
        .catch((err) => Response.handleError(response, codes.serverError, err));
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  async voteQuestion(request, response) {
    try {
      const { questionid, action } = request.params;
      if (getQuestionById(questionid) === null || getQuestionById(questionid) === []) {
        return Response.handleError(response, codes.notFound, 'invalid answer id (not found)');
      }
      if (action === 'up') {
        upVoteQuestion(questionid)
          .then((data) => Response.success(response, codes.success, data, `Answer with id: ${answerid}, voted up successfully`))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else if (action === 'down') {
        downVoteQuestion(questionid)
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
export default new QuestionController();

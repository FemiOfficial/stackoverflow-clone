/* eslint-disable import/no-unresolved */
import {
  saveQuestion, getAllQuestions, getQuestionsByTag,
  viewQuestionById, upVoteQuestion, downVoteQuestion,
  getQuestionById, subscribe, unsubscribe,
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
            subscribed: doc.subscribed,
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
      const question = await getQuestionById(questionid);
      if (question === null || question === []) {
        return Response.handleError(response, codes.notFound, 'invalid question id (not found)');
      }
      if (action === 'up') {
        upVoteQuestion(questionid)
          .then((data) => Response.success(response, codes.success, data, `Question with id: ${questionid}, voted up successfully`))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else if (action === 'down') {
        downVoteQuestion(questionid)
          .then((data) => Response.success(response, codes.success, data, `Question with id: ${questionid}, voted down successfully`))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else {
        return Response.handleError(response, codes.badRequest, 'invalid action parameter (up or down vote actions))');
      }
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  async handleSubscription(request, response) {
    try {
      const { questionid, action } = request.params;
      const question = await getQuestionById(questionid);
      const user = utils.getUserFromToken(request);

      if (user.username !== question.user.username) {
        return Response.handleError(response, codes.badRequest, 'invalid user, only user that ask question can request subscription');
      }

      if (question === null || question === []) {
        return Response.handleError(response, codes.notFound, 'invalid question id (not found)');
      }

      if (question.subscribed && action === 'subscribe') {
        return Response.handleError(response, codes.conflict, `Question with id: ${questionid} already subscribed to answers notification`);
      }

      if (!question.subscribed && action === 'unsubscribe') {
        return Response.handleError(response, codes.conflict, `Question with id: ${questionid} already not subscribed to answers notification`);
      }

      if (action === 'subscribe') {
        subscribe(questionid)
          .then((data) => Response.success(response, codes.success, data, 'successfully subscribed to answer notification'))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else if (action === 'unsubscribe') {
        unsubscribe(questionid)
          .then((data) => Response.success(response, codes.success, data, 'successfully unsubscribed from answer notification'))
          .catch((err) => Response.handleError(response, codes.serverError, err));
      } else {
        return Response.handleError(response, codes.badRequest, 'invalid request parameter (subscribe or unsubscribe)');
      }


    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }
}
export default new QuestionController();

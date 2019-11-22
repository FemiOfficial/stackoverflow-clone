import { isEmpty } from 'validator';
import codes from '../helpers/statusCodes';
import { handleValidationError, handleError } from '../helpers/Response';


class AnswersValidators {
  validatePostAnswerRequest(request, response, next) {
    // try {
      const { body } = request;
      const errors = [];

      if (body.body === null || !body.body || isEmpty(body.body) || body.body.length < 8) {
        errors.push('answer body is required');
      }

      if (errors.length !== 0) {
        return handleValidationError(response, codes.badRequest, errors);
      }

      next();

    // } catch (error) {
    //   return handleError(response, codes.serverError, error)
    // }
  }
}

module.exports = new AnswersValidators();

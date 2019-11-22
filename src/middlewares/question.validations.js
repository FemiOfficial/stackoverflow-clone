import { isEmpty } from 'validator';
import codes from '../helpers/statusCodes';
import { handleValidationError, handleError } from '../helpers/Response';

class QuestionValidators {
  validateAskPayload(request, response, next) {
    try {
      const { body } = request;
      const errors = [];

      if (body.title === null || !body.title || isEmpty(body.title) || body.title.length < 6) {
        errors.push('title is required (at least 6 characters)');
      }

      if (body.tags === null || !body.tags || !Array.isArray(body.tags) || body.tags.length < 2) {
        errors.push('question tags are required (array of at least two strings)');
      }

      if (Array.isArray(body.tags)) {
        for (const tag of body.tags) {
          if (typeof tag !== 'string') {
            errors.push('questions tags must be string types');
            break;
          }
        }
      }

      if (body.body === null || !body.body || isEmpty(body.body) || body.body.length < 8) {
        errors.push('question body is required (at least 8 characters)');
      }

      if (errors.length !== 0) {
        return handleValidationError(response, codes.badRequest, errors);
      }

      next();
    } catch (error) {
      return handleError(response, codes.serverError, error);
    }
  }

  validateSearchPayload(request, response, next) {
    try {
      const { question } = request.body;
      const errors = [];

      if (!question || question === null || isEmpty(question)) {
        errors.push('question string is required')
      }

      if (errors.length !== 0) {
        return handleValidationError(response, codes.badRequest, errors);
      }

      next();
    } catch (error) {
      return handleError(response, codes.serverError, error);
    }
  }
}

module.exports = new QuestionValidators();

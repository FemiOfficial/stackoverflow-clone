import { isEmpty, isEmail } from 'validator';
import { handleValidationError } from '../Helpers/Response';
import codes from '../Helpers/statusCodes';


class AuthVlidations {
  validateLoginPayload(request, response, next) {
    try {
      const { body } = request;
      const errors = [];

      if (body.username === null || !body.username || isEmpty(body.username)) {
        errors.push('username is required');
      }

      if (body.password === null || !body.password || isEmpty(body.password)) {
        errors.push('password is required');
      }
      if (errors.length !== 0) {
        return handleValidationError(response, codes.badRequest, errors);
      }
      next();
    } catch (error) {
      return handleValidationError(response, codes.serverError, error);
    }
  }

  validateRegistrationPayload(request, response, next) {
    try {
      const { body } = request;
      const errors = [];

      if (body.username === null || !body.username || isEmpty(body.username)) {
        errors.push('username is required');
      }

      if (body.password === null || !body.password || isEmpty(body.password)) {
        errors.push('password is required');
      }

      if (body.githubUsername === null || !body.githubUsername || isEmpty(body.githubUsername)) {
        errors.push('githubUsername is required');
      }

      if (body.email === null || !body.email || isEmpty(body.email) || !isEmail(body.email)) {
        errors.push('a valid email is required');
      }
      if (errors.length !== 0) {
        return handleValidationError(response, codes.badRequest, errors);
      }
      next();
    } catch (error) {
      return handleValidationError(response, codes.serverError, error);
    }
  }
}

module.exports = new AuthVlidations();

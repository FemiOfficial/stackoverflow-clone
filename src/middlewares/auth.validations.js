import { isEmpty, isEmail, isAlphanumeric } from 'validator';
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

      if (body.username === null || !body.username || isEmpty(body.username) || body.username.length < 6) {
        errors.push('username is required (at least 6 characters)');
      }

      if (body.password === null || !body.password || isEmpty(body.password) || !isAlphanumeric(body.password) || body.password.length < 8) {
        errors.push('password is required (alphanumeric and not less than 8 characters)');
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

import jwt from 'jsonwebtoken';
import { isEmpty, isEmail, isAlphanumeric } from 'validator';
import { handleValidationError, handleError } from '../helpers/Response';
import codes from '../helpers/statusCodes';

class AuthVlidations {
  validateAccessToken(request, response, next) {
    const authToken = request.body.token || request.query.token
      || request.headers['x-access-token']
      || request.headers.Authorization || request.headers.authorization;

    if (!authToken) {
      return handleError(response, codes.badRequest,
        'token must be provided');
    }
    // try {
      const decoded = jwt.decode(request.headers.authorization);

      if (Date.now() >= decoded.exp * 1000) {
        return handleError(response, codes.unAuthorized, 'token expired!');
      }
      const verified = jwt.verify(request.headers.authorization, process.env.API_SECRET_KEY);

      if (!verified) {
        return handleError(response, codes.badRequest,
          'invalid token provided');
      }

      next();
    // } catch (error) {
    //   return handleError(response, codes.serverError, error);
    // }
  }

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

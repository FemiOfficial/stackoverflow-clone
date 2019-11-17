'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require('validator');

var _Response = require('../helpers/Response');

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthVlidations = function () {
  function AuthVlidations() {
    (0, _classCallCheck3.default)(this, AuthVlidations);
  }

  (0, _createClass3.default)(AuthVlidations, [{
    key: 'validateAccessToken',
    value: function validateAccessToken(request, response, next) {
      var authToken = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers.Authorization || request.headers.authorization;

      if (!authToken) {
        return (0, _Response.handleError)(response, _statusCodes2.default.badRequest, 'token must be provided');
      }
      try {
        var decoded = _jsonwebtoken2.default.decode(request.headers.authorization);

        if (Date.now() >= decoded.exp * 1000) {
          return (0, _Response.handleError)(response, _statusCodes2.default.unAuthorized, 'token expired!');
        }
        var verified = _jsonwebtoken2.default.verify(request.headers.authorization, process.env.API_SECRET_KEY);

        if (!verified) {
          return (0, _Response.handleError)(response, _statusCodes2.default.badRequest, 'invalid token provided');
        }

        next();
      } catch (error) {
        return (0, _Response.handleError)(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'validateLoginPayload',
    value: function validateLoginPayload(request, response, next) {
      try {
        var body = request.body;

        var errors = [];

        if (body.username === null || !body.username || (0, _validator.isEmpty)(body.username)) {
          errors.push('username is required');
        }

        if (body.password === null || !body.password || (0, _validator.isEmpty)(body.password)) {
          errors.push('password is required');
        }
        if (errors.length !== 0) {
          return (0, _Response.handleValidationError)(response, _statusCodes2.default.badRequest, errors);
        }
        next();
      } catch (error) {
        return (0, _Response.handleValidationError)(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'validateRegistrationPayload',
    value: function validateRegistrationPayload(request, response, next) {
      try {
        var body = request.body;

        var errors = [];

        if (body.username === null || !body.username || (0, _validator.isEmpty)(body.username) || body.username.length < 6) {
          errors.push('username is required (at least 6 characters)');
        }

        if (body.password === null || !body.password || (0, _validator.isEmpty)(body.password) || !(0, _validator.isAlphanumeric)(body.password) || body.password.length < 8) {
          errors.push('password is required (alphanumeric and not less than 8 characters)');
        }

        if (body.githubUsername === null || !body.githubUsername || (0, _validator.isEmpty)(body.githubUsername)) {
          errors.push('githubUsername is required');
        }

        if (body.email === null || !body.email || (0, _validator.isEmpty)(body.email) || !(0, _validator.isEmail)(body.email)) {
          errors.push('a valid email is required');
        }
        if (errors.length !== 0) {
          return (0, _Response.handleValidationError)(response, _statusCodes2.default.badRequest, errors);
        }
        next();
      } catch (error) {
        return (0, _Response.handleValidationError)(response, _statusCodes2.default.serverError, error);
      }
    }
  }]);
  return AuthVlidations;
}();

module.exports = new AuthVlidations();
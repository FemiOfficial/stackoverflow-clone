'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _validator = require('validator');

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _Response = require('../helpers/Response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnswersValidators = function () {
  function AnswersValidators() {
    (0, _classCallCheck3.default)(this, AnswersValidators);
  }

  (0, _createClass3.default)(AnswersValidators, [{
    key: 'validatePostAnswerRequest',
    value: function validatePostAnswerRequest(request, response, next) {
      // try {
      var body = request.body;

      var errors = [];

      if (body.body === null || !body.body || (0, _validator.isEmpty)(body.body) || body.body.length < 8) {
        errors.push('answer body is required');
      }

      if (errors.length !== 0) {
        return (0, _Response.handleValidationError)(response, _statusCodes2.default.badRequest, errors);
      }

      next();

      // } catch (error) {
      //   return handleError(response, codes.serverError, error)
      // }
    }
  }]);
  return AnswersValidators;
}();

module.exports = new AnswersValidators();
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _validator = require('validator');

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _Response = require('../helpers/Response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestionValidators = function () {
  function QuestionValidators() {
    (0, _classCallCheck3.default)(this, QuestionValidators);
  }

  (0, _createClass3.default)(QuestionValidators, [{
    key: 'validateAskPayload',
    value: function validateAskPayload(request, response, next) {
      try {
        var body = request.body;

        var errors = [];

        if (body.title === null || !body.title || (0, _validator.isEmpty)(body.title) || body.title.length < 6) {
          errors.push('title is required (at least 6 characters)');
        }

        if (body.tags === null || !body.tags || !Array.isArray(body.tags) || body.tags.length < 2) {
          errors.push('question tags are required (array of at least two strings)');
        }

        if (Array.isArray(body.tags)) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(body.tags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var tag = _step.value;

              if (typeof tag !== 'string') {
                errors.push('questions tags must be string types');
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        if (body.body === null || !body.body || (0, _validator.isEmpty)(body.body) || body.body.length < 8) {
          errors.push('question body is required (at least 8 characters)');
        }

        if (errors.length !== 0) {
          return (0, _Response.handleValidationError)(response, _statusCodes2.default.badRequest, errors);
        }

        next();
      } catch (error) {
        return (0, _Response.handleError)(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'validateSearchPayload',
    value: function validateSearchPayload(request, response, next) {
      try {
        var question = request.body.question;

        var errors = [];

        if (!question || question === null || (0, _validator.isEmpty)(question)) {
          errors.push('question string is required');
        }

        if (errors.length !== 0) {
          return (0, _Response.handleValidationError)(response, _statusCodes2.default.badRequest, errors);
        }

        next();
      } catch (error) {
        return (0, _Response.handleError)(response, _statusCodes2.default.serverError, error);
      }
    }
  }]);
  return QuestionValidators;
}();

module.exports = new QuestionValidators();
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
var Response = function () {
  function Response() {
    (0, _classCallCheck3.default)(this, Response);
  }

  (0, _createClass3.default)(Response, [{
    key: 'authSuccess',
    value: function authSuccess(res, status, token, data, message) {
      var userdata = {
        email: data.email,
        username: data.username,
        githubUsername: data.githubUsername
      };
      return res.status(status).json({
        status: status,
        message: message,
        token: token,
        data: userdata
      });
    }
  }, {
    key: 'success',
    value: function success(res, status, data, message, purpose) {
      switch (purpose) {
        case 'nodata':
          return res.status(status).json({
            status: status,
            message: message
          });
        default:
          return res.status(status).json({
            status: status,
            message: message,
            data: data
          });
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(res, status, error) {
      return res.status(status).json({
        status: status,
        message: error
      });
    }
  }, {
    key: 'handleValidationError',
    value: function handleValidationError(res, status, error) {
      return res.status(status).json({
        status: status,
        message: 'Incomplete(Invalid) Request Payload',
        error: error
      });
    }
  }]);
  return Response;
}();

module.exports = new Response();
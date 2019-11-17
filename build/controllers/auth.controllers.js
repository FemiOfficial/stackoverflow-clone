'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Response = require('../Helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _statusCodes = require('../Helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _utils = require('../Helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

var _auth = require('../services/auth.services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthControllers = function () {
  function AuthControllers() {
    (0, _classCallCheck3.default)(this, AuthControllers);
  }

  (0, _createClass3.default)(AuthControllers, [{
    key: 'register',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var body, checkbyusername, checkbyemail, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = request.body;
                _context.next = 4;
                return (0, _auth.checkUserByUsername)(body.username);

              case 4:
                checkbyusername = _context.sent;
                _context.next = 7;
                return (0, _auth.checkUserByEmail)(body.email);

              case 7:
                checkbyemail = _context.sent;

                if (!(checkbyusername !== null)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.conflict, 'username already taken'));

              case 10:
                if (!(checkbyemail !== null)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.conflict, 'email already taken'));

              case 12:
                _context.next = 14;
                return (0, _auth.registerUser)(body);

              case 14:
                data = _context.sent;
                return _context.abrupt('return', _Response2.default.authSuccess(response, _statusCodes2.default.created, data.accessToken, data.newuser, 'user registered sucessfully'));

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context.t0));

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function register(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'login',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, response) {
        var body, user, token;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                body = request.body;
                _context2.next = 4;
                return (0, _auth.checkUserByUsername)(body.username);

              case 4:
                user = _context2.sent;

                if (!(user === null)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'Invalid username'));

              case 7:
                if (_utils2.default.isvalidpassword(body.password, user.password)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'Invalid password'));

              case 9:
                token = _utils2.default.generateAccessToken(user, process.env.API_SECRET_KEY);
                return _context2.abrupt('return', _Response2.default.authSuccess(response, _statusCodes2.default.success, token, user, 'user login sucessfully'));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context2.t0));

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function login(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return AuthControllers;
}();

exports.default = new AuthControllers();
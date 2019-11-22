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

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _user = require('../services/user.services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersControllers = function () {
  function UsersControllers() {
    (0, _classCallCheck3.default)(this, UsersControllers);
  }

  (0, _createClass3.default)(UsersControllers, [{
    key: 'deleteUser',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _user.deleteUserByUsername)(request.params.username).then(function (data) {
                  if (data === null) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'no user found with username: ' + request.params.username);
                  return _Response2.default.success(response, _statusCodes2.default.success, null, request.params.username + ' was deleted successfully', 'nodata');
                }).catch(function (error) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
                });

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context.t0));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function deleteUser(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return deleteUser;
    }()
  }]);
  return UsersControllers;
}();

exports.default = new UsersControllers();
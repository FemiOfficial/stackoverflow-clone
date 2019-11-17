'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _users = require('../db/models/users.model');

var _users2 = _interopRequireDefault(_users);

var _utils = require('../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthServices = function () {
  function AuthServices() {
    (0, _classCallCheck3.default)(this, AuthServices);
  }

  (0, _createClass3.default)(AuthServices, [{
    key: 'registerUser',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var user, usermodel;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = {
                  email: data.email,
                  username: data.username,
                  firstname: data.firstname,
                  lastname: data.lastname,
                  githubUsername: data.githubUsername,
                  password: _utils2.default.hashpassword(data.password)
                };
                usermodel = new _users2.default(user);
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  usermodel.save(function (err, newuser) {
                    if (err) reject(err);
                    var accessToken = _utils2.default.generateAccessToken(newuser, process.env.API_SECRET_KEY);
                    resolve({ accessToken: accessToken, newuser: newuser });
                  });
                }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function registerUser(_x) {
        return _ref.apply(this, arguments);
      }

      return registerUser;
    }()
  }, {
    key: 'checkUserByUsername',
    value: function checkUserByUsername(username) {
      return new _promise2.default(function (resolve, reject) {
        _users2.default.findOne({ username: username }).select('-_id email username githubUsername password').exec(function (err, user) {
          if (err) reject(err);
          resolve(user);
        });
      });
    }
  }, {
    key: 'getUserByUsernameAndReturnWithId',
    value: function getUserByUsernameAndReturnWithId(username) {
      return new _promise2.default(function (resolve, reject) {
        _users2.default.findOne({ username: username }).select('_id email username githubUsername').exec(function (err, user) {
          if (err) reject(err);
          resolve(user);
        });
      });
    }
  }, {
    key: 'checkUserByEmail',
    value: function checkUserByEmail(email) {
      return new _promise2.default(function (resolve, reject) {
        _users2.default.findOne({ email: email }).select('-_id email username githubUsername').exec(function (err, user) {
          if (err) reject(err);
          resolve(user);
        });
      });
    }
  }]);
  return AuthServices;
}();

module.exports = new AuthServices();
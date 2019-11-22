'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _users = require('../db/models/users.model');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserServices = function () {
  function UserServices() {
    (0, _classCallCheck3.default)(this, UserServices);
  }

  (0, _createClass3.default)(UserServices, [{
    key: 'deleteUserByUsername',
    value: function deleteUserByUsername(username) {
      return new _promise2.default(function (resolve, reject) {
        _users2.default.findOneAndDelete({ username: username }, function (error, response) {
          if (error) reject(error);
          resolve(response);
        });
      });
    }
  }]);
  return UserServices;
}();

module.exports = new UserServices();
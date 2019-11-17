'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Utils = {
  verifyToken: function verifyToken(token) {
    var authToken = _jsonwebtoken2.default.verify(token, process.env.API_SECRET_KEY);
    return authToken;
  },
  hashpassword: function hashpassword(pwd) {
    var salt = _bcrypt2.default.genSaltSync(15);
    var password = _bcrypt2.default.hashSync(pwd, salt);
    return password;
  },
  isvalidpassword: function isvalidpassword(pwd, userpwd) {
    var isValid = _bcrypt2.default.compareSync(pwd, userpwd);
    return isValid;
  },
  generateAccessToken: function generateAccessToken(data, key) {

    var payload = {
      username: data.username,
      githubUsername: data.githubUsername,
      email: data.email,
      generatedTime: (0, _moment2.default)().toDate()
    };

    var authToken = _jsonwebtoken2.default.sign(payload, key, { expiresIn: '24h' });
    return authToken;
  }
};

exports.default = Utils;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  username: String,
  email: String,
  githubUsername: String,
  password: String
}, { timestamps: true });

var UserModel = _mongoose2.default.model('Users', UserSchema);

exports.default = UserModel;
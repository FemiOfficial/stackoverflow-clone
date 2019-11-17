'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./users.routes');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexRouter = _express2.default.Router();

indexRouter.use('/auth', _auth2.default);

indexRouter.use('/users', _users2.default);

exports.default = indexRouter;
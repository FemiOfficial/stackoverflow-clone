'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _trimInputs = require('../middlewares/trimInputs');

var _trimInputs2 = _interopRequireDefault(_trimInputs);

var _auth = require('../middlewares/auth.validations');

var _auth2 = require('../controllers/auth.controllers');

var _auth3 = _interopRequireDefault(_auth2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.post('/signin', _trimInputs2.default, _auth.validateLoginPayload, _auth3.default.login);

authRouter.post('/signup', _trimInputs2.default, _auth.validateRegistrationPayload, _auth3.default.register);

exports.default = authRouter;
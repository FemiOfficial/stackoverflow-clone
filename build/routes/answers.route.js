'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _answer = require('../middlewares/answer.validation');

var _trimInputs = require('../middlewares/trimInputs');

var _trimInputs2 = _interopRequireDefault(_trimInputs);

var _auth = require('../middlewares/auth.validations');

var _answer2 = require('../controllers/answer.controllers');

var _answer3 = _interopRequireDefault(_answer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var answerRouter = _express2.default.Router();

answerRouter.get('/:answerid', _auth.validateAccessToken, _answer3.default.viewAnswerById);

answerRouter.get('/byquestion/all/:questionid', _auth.validateAccessToken, _answer3.default.viewAnswersByQuestionId);

answerRouter.get('/byquestion/accepted/:questionid', _auth.validateAccessToken, _answer3.default.viewAnswersByQuestionIdAccepted);

answerRouter.post('/post/:questionid', _trimInputs2.default, _auth.validateAccessToken, _answer.validatePostAnswerRequest, _answer3.default.postAnswer);

answerRouter.patch('/accept/:answerid', _auth.validateAccessToken, _answer3.default.acceptAnswer);

answerRouter.patch('/vote/:answerid/:action', _auth.validateAccessToken, _answer3.default.voteAnswer);

answerRouter.delete('/:answerid', _auth.validateAccessToken, _answer3.default.deleteAnswer);

exports.default = answerRouter;
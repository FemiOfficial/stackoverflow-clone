'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _trimInputs = require('../middlewares/trimInputs');

var _trimInputs2 = _interopRequireDefault(_trimInputs);

var _question = require('../middlewares/question.validations');

var _auth = require('../middlewares/auth.validations');

var _question2 = require('../controllers/question.controllers');

var _question3 = _interopRequireDefault(_question2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionRouter = _express2.default.Router();

questionRouter.post('/ask', _trimInputs2.default, _auth.validateAccessToken, _question.validateAskPayload, _question3.default.handleAskQuestion);

questionRouter.get('/', _auth.validateAccessToken, _question3.default.viewAllQuestions);

questionRouter.get('/byuser', _auth.validateAccessToken, _question3.default.viewQuestionsByUser);

questionRouter.get('/bytag/:tag', _auth.validateAccessToken, _question3.default.viewQuestionsWithATag);

questionRouter.get('/search', _auth.validateAccessToken, _question.validateSearchPayload, _question3.default.searchQuestion);

questionRouter.get('/byid/:id', _auth.validateAccessToken, _question3.default.viewQuestionById);

questionRouter.patch('/vote/:questionid/:action', _auth.validateAccessToken, _question3.default.voteQuestion);

questionRouter.delete('/:questionid', _auth.validateAccessToken, _question3.default.deleteQuestion);

questionRouter.patch('/:action/:questionid/', _auth.validateAccessToken, _question3.default.handleSubscription);

exports.default = questionRouter;
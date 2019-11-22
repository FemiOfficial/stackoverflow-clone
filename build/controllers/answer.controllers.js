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

var _answers = require('../services/answers.services');

var _question = require('../services/question.services');

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _utils = require('../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnswerControllers = function () {
  function AnswerControllers() {
    (0, _classCallCheck3.default)(this, AnswerControllers);
  }

  (0, _createClass3.default)(AnswerControllers, [{
    key: 'postAnswer',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var body, questionid, user, question;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = request.body.body;
                questionid = request.params.questionid;
                user = _utils2.default.getUserFromToken(request);
                _context.next = 6;
                return (0, _question.getQuestionById)(questionid);

              case 6:
                question = _context.sent;

                if (!(question === null || question.length === 0)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid question id'));

              case 9:
                _context.next = 11;
                return (0, _question.updateAnswer)(question._id);

              case 11:
                question = _context.sent;

                (0, _answers.saveAnswer)(user, question, body).then(function (data) {
                  if (question.subscribed === true) {
                    var answernotification = {
                      question: question,
                      answer: {
                        body: body,
                        username: user.username,
                        email: user.email
                      }
                    };
                    _utils2.default.sendanswernotification(question.user.email, 'Answer Notification', answernotification);
                  }

                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Answer posted successfully');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context.t0));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      function postAnswer(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return postAnswer;
    }()
  }, {
    key: 'acceptAnswer',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, response) {
        var answerid, user, answer;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                answerid = request.params.answerid;
                user = _utils2.default.getUserFromToken(request);
                _context2.next = 5;
                return (0, _answers.getAnswerById)(answerid);

              case 5:
                answer = _context2.sent;

                if (!(user.username !== answer.question.user.username)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'users can only accept question asked personally'));

              case 8:
                if (!(answer === null || answer === [])) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid answer id (not found)'));

              case 10:
                if (!(answer.accepted === true)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.conflict, 'answer has already been accepted'));

              case 12:

                (0, _answers.acceptAnswer)(answerid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'answer accepted successfully');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context2.t0));

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function acceptAnswer(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return acceptAnswer;
    }()
  }, {
    key: 'voteAnswer',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(request, response) {
        var _request$params, answerid, action, answer;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _request$params = request.params, answerid = _request$params.answerid, action = _request$params.action;
                _context3.next = 4;
                return (0, _answers.getAnswerById)(answerid);

              case 4:
                answer = _context3.sent;

                if (!(answer === null || answer === [])) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid answer id (not found)'));

              case 7:
                if (!(action === 'up')) {
                  _context3.next = 11;
                  break;
                }

                (0, _answers.upVoteAnswer)(answerid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Answer with id: ' + answerid + ', voted up successfully');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context3.next = 16;
                break;

              case 11:
                if (!(action === 'down')) {
                  _context3.next = 15;
                  break;
                }

                (0, _answers.downVoteAnswer)(answerid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Answer with id: ' + answerid + ', voted up successfully');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context3.next = 16;
                break;

              case 15:
                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid action parameter (up or down vote actions))'));

              case 16:
                _context3.next = 21;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context3.t0));

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 18]]);
      }));

      function voteAnswer(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return voteAnswer;
    }()
  }, {
    key: 'viewAnswerById',
    value: function viewAnswerById(request, response) {
      try {
        var answerid = request.params.answerid;

        (0, _answers.viewAnswerById)(answerid).then(function (data) {
          if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'No question with id: ' + answerid);
          return _Response2.default.success(response, _statusCodes2.default.success, data, 'Answer with id: ' + answerid);
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'viewAnswersByQuestionId',
    value: function viewAnswersByQuestionId(request, response) {
      try {
        var questionid = request.params.questionid;

        var question = (0, _question.getQuestionById)(questionid);

        if (question === null || question === []) {
          return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid question id (not found)');
        }

        (0, _answers.viewAnswersByQuestionIdAnswered)(questionid).then(function (data) {
          if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'Question with id: ' + questionid + ' has not been answered');
          return _Response2.default.success(response, _statusCodes2.default.success, data, 'Answers for question with id: ' + questionid);
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'viewAnswersByQuestionIdAccepted',
    value: function viewAnswersByQuestionIdAccepted(request, response) {
      try {
        var questionid = request.params.questionid;

        var question = (0, _question.getQuestionById)(questionid);
        if (question === null || question === []) {
          return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid question id (not found)');
        }
        (0, _answers.viewAnswersByQuestionIdAccepted)(questionid).then(function (data) {
          if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'Question with id: ' + questionid + ' has no accepted answer');
          return _Response2.default.success(response, _statusCodes2.default.success, data, 'Accepted answers for question with id: ' + questionid);
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'deleteAnswer',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(request, response) {
        var answerid, answer, user;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                answerid = request.params.answerid;
                _context4.next = 4;
                return (0, _answers.getAnswerById)(answerid);

              case 4:
                answer = _context4.sent;
                user = _utils2.default.getUserFromToken(request);

                if (!(answer === null || answer === [])) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid answer id (not found)'));

              case 8:
                if (!(user.username !== answer.user.username)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid user, only user that answered can delete'));

              case 10:

                (0, _answers.deleteAnswerById)(answerid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Answer with id: ' + answerid + ', deleted successfully', 'nodata');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context4.next = 16;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](0);
                return _context4.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context4.t0));

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function deleteAnswer(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return deleteAnswer;
    }()
  }]);
  return AnswerControllers;
}(); /* eslint-disable import/no-unresolved */


exports.default = new AnswerControllers();
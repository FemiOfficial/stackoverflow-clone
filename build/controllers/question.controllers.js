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

var _question = require('../services/question.services');

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _utils = require('../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
var QuestionController = function () {
  function QuestionController() {
    (0, _classCallCheck3.default)(this, QuestionController);
  }

  (0, _createClass3.default)(QuestionController, [{
    key: 'handleAskQuestion',
    value: function handleAskQuestion(request, response) {
      try {
        var user = _utils2.default.getUserFromToken(request);

        (0, _question.saveQuestion)(user.username, request.body).then(function (doc) {
          var data = {
            user: doc.user.username,
            title: doc.title,
            subscribed: doc.subscribed,
            tags: doc.tags,
            body: doc.body,
            id: doc._id
          };
          return _Response2.default.success(response, _statusCodes2.default.success, data, 'Question uploaded successfully');
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'viewAllQuestions',
    value: function viewAllQuestions(request, response) {
      try {
        (0, _question.getAllQuestions)().then(function (data) {
          if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'No question added');
          return _Response2.default.success(response, _statusCodes2.default.success, data, 'All Questions');
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'viewQuestionsWithATag',
    value: function viewQuestionsWithATag(request, response) {
      try {
        var tag = request.params.tag;


        (0, _question.getQuestionsByTag)(tag).then(function (data) {
          if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'No question with tag: ' + tag);

          return _Response2.default.success(response, _statusCodes2.default.success, data, 'All Questions with tag: ' + tag);
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'viewQuestionById',
    value: function viewQuestionById(request, response) {
      try {
        var id = request.params.id;

        (0, _question.viewQuestionById)(id).then(function (data) {
          if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'No question with id: ' + id);
          return _Response2.default.success(response, _statusCodes2.default.success, data, 'Question with id: ' + id);
        }).catch(function (err) {
          return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
        });
      } catch (error) {
        return _Response2.default.handleError(response, _statusCodes2.default.serverError, error);
      }
    }
  }, {
    key: 'voteQuestion',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var _request$params, questionid, action, question;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _request$params = request.params, questionid = _request$params.questionid, action = _request$params.action;
                _context.next = 4;
                return (0, _question.getQuestionById)(questionid);

              case 4:
                question = _context.sent;

                if (!(question === null || question === [])) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid question id (not found)'));

              case 7:
                if (!(action === 'up')) {
                  _context.next = 11;
                  break;
                }

                (0, _question.upVoteQuestion)(questionid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Question with id: ' + questionid + ', voted up successfully');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context.next = 16;
                break;

              case 11:
                if (!(action === 'down')) {
                  _context.next = 15;
                  break;
                }

                (0, _question.downVoteQuestion)(questionid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Question with id: ' + questionid + ', voted down successfully');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context.next = 16;
                break;

              case 15:
                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid action parameter (up or down vote actions))'));

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context.t0));

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function voteQuestion(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return voteQuestion;
    }()
  }, {
    key: 'deleteQuestion',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, response) {
        var questionid, question, user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                questionid = request.params.questionid;
                _context2.next = 4;
                return (0, _question.getQuestionById)(questionid);

              case 4:
                question = _context2.sent;
                user = _utils2.default.getUserFromToken(request);

                if (!(question === null || question === [])) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid question id (not found)'));

              case 8:
                if (!(user.username !== question.user.username)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid user, only user that ask question can delete'));

              case 10:

                (0, _question.deleteQuestionById)(questionid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'Question with id: ' + questionid + ', deleted successfully', 'nodata');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context2.t0));

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function deleteQuestion(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return deleteQuestion;
    }()
  }, {
    key: 'handleSubscription',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(request, response) {
        var _request$params2, questionid, action, question, user;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _request$params2 = request.params, questionid = _request$params2.questionid, action = _request$params2.action;
                _context3.next = 4;
                return (0, _question.getQuestionById)(questionid);

              case 4:
                question = _context3.sent;
                user = _utils2.default.getUserFromToken(request);

                if (!(user.username !== question.user.username)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid user, only user that ask question can request subscription'));

              case 8:
                if (!(question === null || question === [])) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.notFound, 'invalid question id (not found)'));

              case 10:
                if (!(question.subscribed && action === 'subscribe')) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.conflict, 'Question with id: ' + questionid + ' already subscribed to answers notification'));

              case 12:
                if (!(!question.subscribed && action === 'unsubscribe')) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.conflict, 'Question with id: ' + questionid + ' already not subscribed to answers notification'));

              case 14:
                if (!(action === 'subscribe')) {
                  _context3.next = 18;
                  break;
                }

                (0, _question.subscribe)(questionid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'successfully subscribed to answer notification');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context3.next = 23;
                break;

              case 18:
                if (!(action === 'unsubscribe')) {
                  _context3.next = 22;
                  break;
                }

                (0, _question.unsubscribe)(questionid).then(function (data) {
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'successfully unsubscribed from answer notification');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context3.next = 23;
                break;

              case 22:
                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.badRequest, 'invalid request parameter (subscribe or unsubscribe)'));

              case 23:
                _context3.next = 28;
                break;

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context3.t0));

              case 28:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 25]]);
      }));

      function handleSubscription(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return handleSubscription;
    }()
  }, {
    key: 'viewQuestionsByUser',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(request, response) {
        var user;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                user = _utils2.default.getUserFromToken(request);


                (0, _question.getAllQuestionsAskByUser)(user.username).then(function (data) {
                  if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'No question asked by ' + user.username);
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'All Questions asked by ' + user.username);
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context4.next = 8;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4['catch'](0);
                return _context4.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context4.t0));

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));

      function viewQuestionsByUser(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return viewQuestionsByUser;
    }()
  }, {
    key: 'searchQuestion',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(request, response) {
        var question;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                question = request.body.question;


                (0, _question.getQuestionByBody)(question).then(function (data) {
                  if (data === null || data.length === 0) return _Response2.default.handleError(response, _statusCodes2.default.notFound, 'No question related to search');
                  return _Response2.default.success(response, _statusCodes2.default.success, data, 'All Questions related to search');
                }).catch(function (err) {
                  return _Response2.default.handleError(response, _statusCodes2.default.serverError, err);
                });
                _context5.next = 8;
                break;

              case 5:
                _context5.prev = 5;
                _context5.t0 = _context5['catch'](0);
                return _context5.abrupt('return', _Response2.default.handleError(response, _statusCodes2.default.serverError, _context5.t0));

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 5]]);
      }));

      function searchQuestion(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return searchQuestion;
    }()
  }]);
  return QuestionController;
}();

exports.default = new QuestionController();
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

var _questions = require('../db/models/questions.model');

var _questions2 = _interopRequireDefault(_questions);

var _auth = require('./auth.services');

var _answers = require('./answers.services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestionServices = function () {
  function QuestionServices() {
    (0, _classCallCheck3.default)(this, QuestionServices);
  }

  (0, _createClass3.default)(QuestionServices, [{
    key: 'saveQuestion',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username, question) {
        var user, newQuestion, questionmodel;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _auth.getUserByUsernameAndReturnWithId)(username);

              case 2:
                user = _context.sent;
                newQuestion = {
                  user: user,
                  title: question.title,
                  tags: question.tags,
                  body: question.body
                };
                questionmodel = new _questions2.default(newQuestion);
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  questionmodel.save(function (err, doc) {
                    if (err) reject(err);
                    resolve(doc);
                  });
                }));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveQuestion(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return saveQuestion;
    }()
  }, {
    key: 'getAllQuestions',
    value: function getAllQuestions() {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.find({}, '_id user title body view_count answer_count subscribed answered tags ', function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'getAllQuestionsAskByUser',
    value: function getAllQuestionsAskByUser(username) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.find({ 'user.username': username }, '_id title body view_count answer_count subscribed answered tags ', function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'getQuestionByBody',
    value: function getQuestionByBody(body) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.find({ body: body }, '_id user title body view_count answer_count subscribed answered tags ', function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'getQuestionsByTag',
    value: function getQuestionsByTag(tag) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.find({ tags: tag }, '_id user title body view_count subscribed answer_count answered tags ', function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'getQuestionById',
    value: function getQuestionById(id) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(id, '_id user title body view_count vote_count subscribed answer_count answered tags ', function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'viewQuestionById',
    value: function viewQuestionById(id) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(id, '_id user title body view_count vote_count subscribed answer_count answered tags ', function (err, doc) {
          if (err) reject(err);
          if (doc === null || doc === undefined) {
            resolve(doc);
          } else {
            doc.view_count += 1;
            doc.save();
            resolve(doc);
          }
        });
      });
    }
  }, {
    key: 'updateAnswer',
    value: function updateAnswer(id) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(id, function (err, doc) {
          if (err) reject(err);
          if (doc !== null || doc !== []) {
            doc.answer_count += 1;
            doc.answered = true;
            doc.save();
          }
          resolve(doc);
        });
      });
    }
  }, {
    key: 'upVoteQuestion',
    value: function upVoteQuestion(id) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(id, function (err, doc) {
          if (err) reject(err);
          doc.vote_count += 1;
          doc.save();
          resolve(doc);
        });
      });
    }
  }, {
    key: 'downVoteQuestion',
    value: function downVoteQuestion(id) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(id, function (err, doc) {
          if (err) reject(err);
          if (doc.vote_count !== 0) {
            doc.vote_count -= 1;
          }
          doc.save();
          resolve(doc);
        });
      });
    }
  }, {
    key: 'deleteQuestionByTAG',
    value: function deleteQuestionByTAG(tag) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findOneAndDelete({ tags: tag }, function (error, response) {
          if (error) reject(error);
          resolve(response);
        });
      });
    }
  }, {
    key: 'deleteQuestionById',
    value: function deleteQuestionById(id) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findOneAndDelete({ _id: id }, function (error, response) {
          if (error) reject(error);
          (0, _answers.deleteAnswersByQuestionId)(id);
          resolve(response);
        });
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(questionid) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(questionid, function (error, doc) {
          if (error) reject(error);
          doc.subscribed = true;
          doc.save();
          resolve(doc);
        });
      });
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(questionid) {
      return new _promise2.default(function (resolve, reject) {
        _questions2.default.findById(questionid, function (error, doc) {
          if (error) reject(error);
          doc.subscribed = false;
          doc.save();
          resolve(doc);
        });
      });
    }
  }]);
  return QuestionServices;
}(); /* eslint-disable import/no-cycle */


module.exports = new QuestionServices();
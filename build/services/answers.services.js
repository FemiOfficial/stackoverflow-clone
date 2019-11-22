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

var _answers = require('../db/models/answers.model');

var _answers2 = _interopRequireDefault(_answers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnswerServices = function () {
  function AnswerServices() {
    (0, _classCallCheck3.default)(this, AnswerServices);
  }

  (0, _createClass3.default)(AnswerServices, [{
    key: 'saveAnswer',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, question, answer) {
        var newAnswer, answermodel;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newAnswer = {
                  question: question,
                  user: {
                    username: user.username,
                    githubUsername: user.githubUsername,
                    email: user.email,
                    id: user.id
                  },
                  body: answer.body
                };
                answermodel = new _answers2.default(newAnswer);
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  answermodel.save(function (err, doc) {
                    if (err) reject(err);
                    resolve(doc);
                  });
                }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveAnswer(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return saveAnswer;
    }()
  }, {
    key: 'acceptAnswer',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _answers2.default.findById(id, function (err, doc) {
                    if (err) reject(err);

                    doc.accepted = true;
                    doc.save();
                    resolve(doc);
                  });
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function acceptAnswer(_x4) {
        return _ref2.apply(this, arguments);
      }

      return acceptAnswer;
    }()
  }, {
    key: 'getAnswerById',
    value: function getAnswerById(id) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.findById(id, function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'viewAnswerById',
    value: function viewAnswerById(id) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.findById(id, '-_id question user body accepted vote_count', function (err, doc) {
          if (err) reject(err);
          resolve(doc);
        });
      });
    }
  }, {
    key: 'viewAnswersByQuestionIdAnswered',
    value: function viewAnswersByQuestionIdAnswered(questionid) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.find({ 'question.answered': true }, '-_id question user body accepted vote_count', function (err, doc) {
          if (err) reject(err);

          var answers = doc.filter(function (i) {
            return i.question._id == questionid;
          });
          resolve(answers);
        });
      });
    }
  }, {
    key: 'viewAnswersByQuestionIdAccepted',
    value: function viewAnswersByQuestionIdAccepted(questionid) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.find({ accepted: true }, '-_id question user body accepted vote_count', function (err, doc) {
          if (err) reject(err);

          var answers = doc.filter(function (i) {
            return i.question._id == questionid;
          });

          resolve(answers);
        });
      });
    }
  }, {
    key: 'viewAnswersByUser',
    value: function viewAnswersByUser(username) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.find({ 'user.username': username }, '-_id question user body accepted vote_count', function (err, doc) {
          if (err) reject(err);

          resolve(doc);
        });
      });
    }
  }, {
    key: 'upVoteAnswer',
    value: function upVoteAnswer(id) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.findById(id, function (err, doc) {
          if (err) reject(err);
          doc.vote_count += 1;
          doc.save();
          resolve(doc);
        });
      });
    }
  }, {
    key: 'downVoteAnswer',
    value: function downVoteAnswer(id) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.findById(id, function (err, doc) {
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
    key: 'deleteAnswerByBody',
    value: function deleteAnswerByBody(body) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.deleteMany({ body: body }, function (error, response) {
          if (error) reject(error);
          resolve(response);
        });
      });
    }
  }, {
    key: 'deleteAnswersByQuestionId',
    value: function deleteAnswersByQuestionId(questionid) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.deleteMany({ 'question._id': questionid }, function (error, response) {
          if (error) reject(error);
          resolve(response);
        });
      });
    }
  }, {
    key: 'deleteAnswerById',
    value: function deleteAnswerById(answerid) {
      return new _promise2.default(function (resolve, reject) {
        _answers2.default.findByIdAndDelete(answerid, function (error, response) {
          if (error) reject(error);
          resolve(response);
        });
      });
    }
  }]);
  return AnswerServices;
}();

module.exports = new AnswerServices();
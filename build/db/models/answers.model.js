'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnswerSchema = new _mongoose2.default.Schema({
  question: Object,
  user: Object,
  body: String,
  accepted: {
    type: Boolean,
    default: false
  },
  vote_count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

var AnswersModel = _mongoose2.default.model('Answers', AnswerSchema);

exports.default = AnswersModel;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestionSchema = new _mongoose2.default.Schema({
  user: Object,
  title: String,
  tags: Array,
  body: String,
  answered: {
    type: Boolean,
    default: false
  },
  answer_count: {
    type: Number,
    default: 0
  },
  view_count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

var QuestionsModel = _mongoose2.default.model('Questions', QuestionSchema);

exports.default = QuestionsModel;
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
  tags: String,
  body: String,
  answered: Boolean,
  answer_count: Number,
  view_count: Number
}, { timestamps: true });

var QuestionsModel = _mongoose2.default.model('Questions', QuestionSchema);

exports.default = QuestionsModel;
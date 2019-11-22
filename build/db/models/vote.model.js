'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VoteSchema = new _mongoose2.default.Schema({
  user: Object,
  answer: Object,
  vote: Number
}, { timestamps: true });
var VotesModel = _mongoose2.default.model('Votes', VoteSchema);

exports.default = VotesModel;
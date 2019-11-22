'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var trimInputs = function trimInputs(request, response, next) {
  for (var index in request.body) {
    request.body[index] = typeof request.body[index] === 'string' ? request.body[index].trim() : request.body[index];
  }
  next();
};

exports.default = trimInputs;
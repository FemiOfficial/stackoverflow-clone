'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
var Utils = {
  getUserFromToken: function getUserFromToken(request) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers.Authorization || request.headers.authorization;

    var authToken = _jsonwebtoken2.default.verify(token, process.env.API_SECRET_KEY);
    return authToken;
  },
  hashpassword: function hashpassword(pwd) {
    var salt = _bcrypt2.default.genSaltSync(15);
    var password = _bcrypt2.default.hashSync(pwd, salt);
    return password;
  },
  isvalidpassword: function isvalidpassword(pwd, userpwd) {
    var isValid = _bcrypt2.default.compareSync(pwd, userpwd);
    return isValid;
  },
  generateAccessToken: function generateAccessToken(data, key) {
    var payload = {
      username: data.username,
      githubUsername: data.githubUsername,
      email: data.email,
      id: data._id
    };

    var authToken = _jsonwebtoken2.default.sign(payload, key, { expiresIn: '24h' });
    return authToken;
  },
  sendanswernotification: function sendanswernotification(email, title, notification) {
    var auth = {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    };

    var mailOptions = {
      from: 'StackOverFlow Clone',
      to: email,
      subject: title,
      html: 'Message from: <b>StackOverFlow Clone</b>\n      <br></br>\n      <br></br> Hi,  ' + notification.question.user.username + '\n      <br></br>\n      <br></br> Your Question with Title: ' + notification.question.title + '\n      <br></br>\n      <br></br> was answered by, ' + notification.answer.username + '\n      <br></br>\n      <br></br>\n      <br></br> Answer: <b>' + notification.answer.body + '</b>\n      <br></br>\n      <br></br>\n      Regards!'
    };

    var transporter = _nodemailer2.default.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: auth
    });

    transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
        _Logger2.default.log(err);
        return false;
      }
      return true;
    });
  }
};

exports.default = Utils;
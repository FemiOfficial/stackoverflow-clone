'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressIp = require('express-ip');

var _expressIp2 = _interopRequireDefault(_expressIp);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _Logger = require('./helpers/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _index = require('./routes/index.route');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';

var app = (0, _express2.default)();

/** connection mongodb */
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.set('useFindAndModify', false);
_mongoose2.default.set('useUnifiedTopology', true);
_mongoose2.default.connect(_config2.default[NODE_ENV].DATABASE_URL, _config2.default[NODE_ENV].options, function (err) {
  _Logger2.default.log(err);
  _Logger2.default.log('Connected to mongodb successfully on ' + NODE_ENV);
});

/** Enable Cross Origin Resource Sharing */
app.use((0, _cors2.default)());

/** set parser to parse the request data in json format */
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

/** Express RequestIp middleware */
app.use((0, _expressIp2.default)().getIpInfoMiddleware);

/** set app base route */
app.use('/v1', _index2.default);

process.env.TZ = 'Africa/Lagos';

process.env.PORT = 3000;

var server = app.listen(process.env.PORT, function () {
  _Logger2.default.log('app is running from port ' + server.address().port);
});

exports.default = app;
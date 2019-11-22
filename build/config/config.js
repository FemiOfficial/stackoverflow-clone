'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author Alayesanmi Femi
 * @description api global configurations
 */
require('dotenv').config();

var config = {
  development: {
    DATABASE_URL: 'mongodb://localhost:' + process.env.MDB_PORT + process.env.DATABASE_URL,
    SECRET_KEY: process.env.API_SECRET_KEY,
    options: {
      user: process.env.MDB_USRNAME,
      pass: process.env.MDB_PASSWORD,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true
    }
  },
  production: {
    DATABASE_URL: '' + process.env.MONGODB_URI,
    SECRET_KEY: process.env.API_SECRET_KEY,
    options: {
      user: process.env.MDB_LIVE_USRNAME,
      pass: process.env.MDB_LIVE_PASSWORD,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true
    }
  },
  test: {
    DATABASE_URL: 'mongodb://localhost:' + process.env.MDB_PORT + process.env.DATABASE_URL,
    SECRET_KEY: process.env.API_SECRET_KEY,
    options: {
      user: process.env.MDB_TEST_USRNAME,
      pass: process.env.MDB__TEST_PASSWORD,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true
    }
  }
};

exports.default = config;
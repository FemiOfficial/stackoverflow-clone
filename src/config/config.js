/**
 * @author Alayesanmi Femi
 * @description api global configurations
 */
require('dotenv').config();

const config = {
  development: {
    DATABASE_URL: `mongodb://localhost:${process.env.MDW_MDB_PORT}${process.env.DATABASE_URL}`,
    SECRET_KEY: process.env.API_SECRET_KEY,
    options: {
      user: process.env.MDW_MDB_USRNAME,
      pass: process.env.MDW_MDB_PASSWORD,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true,
    },
  },
  production: {
    DATABASE_URL: `mongodb://localhost:${process.env.MDW_MDB_PORT}${process.env.DATABASE_URL}`,
    SECRET_KEY: process.env.API_SECRET_KEY,
    options: {
      user: process.env.MDW_MDB_USRNAME,
      pass: process.env.MDW_MDB_PASSWORD,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true,
    },
  },
};

export default config;

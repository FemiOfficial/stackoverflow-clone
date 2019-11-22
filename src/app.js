import dotenv from 'dotenv';
import express from 'express';
import expressip from 'express-ip';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import Logger from './helpers/Logger';
import indexv1Route from './routes/index.route';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';

const app = express();

process.env.TZ = 'Africa/Lagos';

/** connection mongodb */
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
Logger.log(NODE_ENV);
Logger.log(config[NODE_ENV]);
if (process.env.NODE_ENV) {
  mongoose.connect(config[NODE_ENV].DATABASE_URL, (err) => {
    if (err) Logger.log(err);
    else { Logger.log(`Connected to mongodb successfully on ${NODE_ENV}`); }
  });
} else {
  mongoose.connect(config[NODE_ENV].DATABASE_URL, config[NODE_ENV].options, (err) => {
    if (err) Logger.log(err);
    else { Logger.log(`Connected to mongodb successfully on ${NODE_ENV}`); }
  });
}



/** Enable Cross Origin Resource Sharing */
app.use(cors());

/** set parser to parse the request data in json format */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

/** Express RequestIp middleware */
app.use(expressip().getIpInfoMiddleware);

/** set app base route */
app.use('/v1', indexv1Route);

process.env.TZ = 'Africa/Lagos';

const PORT = process.env.PORT || 4500;

const server = app.listen(PORT, () => {
  Logger.log(`app is running from port ${server.address().port}`);
});

export default app;

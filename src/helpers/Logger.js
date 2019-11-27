/* eslint-disable no-console */
import moment from 'moment';

class Logger {
  log(...data) {
    console.log(moment().toString(), ...data);
  }
}

export default new Logger();

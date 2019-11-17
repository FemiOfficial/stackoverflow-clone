import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const Utils = {

  getUserFromToken(request) {
    const token = request.body.token || request.query.token
    || request.headers['x-access-token']
    || request.headers.Authorization || request.headers.authorization;

    const authToken = jwt.verify(token, process.env.API_SECRET_KEY);
    return authToken;
  },

  hashpassword(pwd) {
    const salt = bcrypt.genSaltSync(15);
    const password = bcrypt.hashSync(pwd, salt);
    return password;
  },

  isvalidpassword(pwd, userpwd) {
    const isValid = bcrypt.compareSync(pwd, userpwd);
    return isValid;
  },

  generateAccessToken(data, key) {
    const payload = {
      username: data.username,
      githubUsername: data.githubUsername,
      email: data.email,
      generatedTime: moment().toDate(),
    };

    const authToken = jwt.sign(
      payload, key,
      { expiresIn: '24h' },
    );
    return authToken;
  }
}

export default Utils;

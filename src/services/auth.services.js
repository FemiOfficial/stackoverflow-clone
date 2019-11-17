import UserModel from '../db/models/users.model';
import utils from '../helpers/utils';

class AuthServices {
  async registerUser(data) {
    const user = {
      email: data.email,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      githubUsername: data.githubUsername,
      password: utils.hashpassword(data.password),
    };
    const usermodel = new UserModel(user);
    return new Promise((resolve, reject) => {
      usermodel.save((err, newuser) => {
        if (err) reject(err);
        const accessToken = utils.generateAccessToken(newuser, process.env.API_SECRET_KEY);
        resolve({ accessToken, newuser });
      });

    });
  }

  checkUserByUsername(username) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ username })
        .select('-_id email username githubUsername password')
        .exec((err, user) => {
          if (err) reject(err);
          resolve(user);
        });
    });
  }

  getUserByUsernameAndReturnWithId(username) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ username })
        .select('_id email username githubUsername')
        .exec((err, user) => {
          if (err) reject(err);
          resolve(user);
        });
    });
  }

  checkUserByEmail(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email })
        .select('-_id email username githubUsername')
        .exec((err, user) => {
          if (err) reject(err);
          resolve(user);
        });
    });
  }
}
module.exports = new AuthServices();

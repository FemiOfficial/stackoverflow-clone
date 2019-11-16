import UserModel from '../db/models/users.model';

class UserServices {
  deleteUserByUsername(username) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndDelete({ username }, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }

}
module.exports = new UserServices();

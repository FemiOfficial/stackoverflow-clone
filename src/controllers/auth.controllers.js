/* eslint-disable import/no-unresolved */
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import utils from '../helpers/utils';

import { registerUser, checkUserByUsername, checkUserByEmail } from '../services/auth.services';

class AuthControllers {
  async register(request, response) {
    try {
      const { body } = request;
      const checkbyusername = await checkUserByUsername(body.username);
      const checkbyemail = await checkUserByEmail(body.email);
      if (checkbyusername !== null) {
        return Response.handleError(response, codes.conflict, 'username already taken');
      }
      if (checkbyemail !== null) {
        return Response.handleError(response, codes.conflict, 'email already taken');
      }
      const data = await registerUser(body);

      return Response.authSuccess(response, codes.created, data.accessToken, data.newuser, 'user registered sucessfully');
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }

  async login(request, response) {
    try {
      const { body } = request;
      const user = await checkUserByUsername(body.username);

      if (user === null) {
        return Response.handleError(response, codes.badRequest, 'Invalid username');
      }
      if (!utils.isvalidpassword(body.password, user.password)) {
        return Response.handleError(response, codes.badRequest, 'Invalid password');
      }
      const token = utils.generateAccessToken(user, process.env.API_SECRET_KEY);

      return Response.authSuccess(response, codes.success, token, user, 'user login sucessfully');
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }
}

export default new AuthControllers();

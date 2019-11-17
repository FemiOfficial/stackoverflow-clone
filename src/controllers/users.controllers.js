import Response from '../Helpers/Response';
import codes from '../Helpers/statusCodes';
import { deleteUserByUsername } from '../services/user.services';

class UsersControllers {
  async deleteUser(request, response) {
    try {
      await deleteUserByUsername(request.params.username)
        .then((data) => {
          if (data === null) return Response.handleError(response, codes.notFound, `no user found with username: ${request.params.username}`);
          return Response.success(response, codes.success, null, `${request.params.username} was deleted successfully`, 'nodata');
        })
        .catch((error) => {
          return Response.handleError(response, codes.serverError, error);
        });
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }
}
export default new UsersControllers();

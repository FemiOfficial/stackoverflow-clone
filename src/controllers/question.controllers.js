import { saveQuestion } from '../services/question.services';
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import utils from '../helpers/utils';

class QuestionController {
  async handleAskQuestion(request, response) {
    try {
      const user = utils.getUserFromToken(request);

      saveQuestion(user.username, request.body)
        .then((doc) => {
          const data = {
            user: doc.user.username,
            title: doc.title,
            tags: doc.tags,
            body: doc.body,
          };
          return Response.success(response, codes.success, data, 'Question uploaded successfully');
        })
        .catch((err) => {
          return Response.handleError(response, codes.serverError, err);
        });
    } catch (error) {
      return Response.handleError(response, codes.serverError, error);
    }
  }
}
export default new QuestionController();

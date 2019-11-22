import express from 'express';
import { validatePostAnswerRequest } from '../middlewares/answer.validation';
import trimInputs from '../middlewares/trimInputs';
import { validateAccessToken } from '../middlewares/auth.validations';
import answerControllers from '../controllers/answer.controllers';

const answerRouter = express.Router();

answerRouter.get('/:answerid',
  validateAccessToken,
  answerControllers.viewAnswerById);

answerRouter.get('/byquestion/all/:questionid',
  validateAccessToken,
  answerControllers.viewAnswersByQuestionId);

answerRouter.get('/byquestion/accepted/:questionid',
  validateAccessToken,
  answerControllers.viewAnswersByQuestionIdAccepted);

answerRouter.post('/post/:questionid',
  trimInputs,
  validateAccessToken,
  validatePostAnswerRequest,
  answerControllers.postAnswer);

answerRouter.patch('/accept/:answerid',
  validateAccessToken,
  answerControllers.acceptAnswer);

answerRouter.patch('/vote/:answerid/:action',
  validateAccessToken,
  answerControllers.voteAnswer);

answerRouter.delete('/:answerid',
  validateAccessToken,
  answerControllers.deleteAnswer);

export default answerRouter;

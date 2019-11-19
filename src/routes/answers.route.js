import express from 'express';
import { validatePostAnswerRequest } from '../middlewares/answer.validation';
import trimInputs from '../middlewares/trimInputs';
import { validateAccessToken } from '../middlewares/auth.validations';
import answerControllers from '../controllers/answer.controllers';

const answerRouter = express.Router();

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

export default answerRouter;

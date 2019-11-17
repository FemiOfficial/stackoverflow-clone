import express from 'express';
import trimInputs from '../middlewares/trimInputs';
import { validateAskPayload } from '../middlewares/question.validations';
import { validateAccessToken } from '../middlewares/auth.validations';
import questioncontrollers from '../controllers/question.controllers';

const questionRouter = express.Router();

questionRouter.post('/ask',
  trimInputs,
  validateAccessToken,
  validateAskPayload,
  questioncontrollers.handleAskQuestion);

questionRouter.get('/',
  validateAccessToken,
  questioncontrollers.viewAllQuestions);

questionRouter.get('/bytag/:tag',
  validateAccessToken,
  questioncontrollers.viewQuestionsWithATag);

questionRouter.get('/byid/:id',
  validateAccessToken,
  questioncontrollers.viewQuestionById);

export default questionRouter;

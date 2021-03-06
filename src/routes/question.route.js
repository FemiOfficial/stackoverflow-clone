import express from 'express';
import trimInputs from '../middlewares/trimInputs';
import { validateAskPayload, validateSearchPayload } from '../middlewares/question.validations';
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

questionRouter.get('/byuser',
  validateAccessToken,
  questioncontrollers.viewQuestionsByUser);

questionRouter.get('/bytag/:tag',
  validateAccessToken,
  questioncontrollers.viewQuestionsWithATag);

questionRouter.get('/search',
  validateAccessToken,
  validateSearchPayload,
  questioncontrollers.searchQuestion);

questionRouter.get('/byid/:id',
  validateAccessToken,
  questioncontrollers.viewQuestionById);

questionRouter.patch('/vote/:questionid/:action',
  validateAccessToken,
  questioncontrollers.voteQuestion);

questionRouter.delete('/:questionid',
  validateAccessToken,
  questioncontrollers.deleteQuestion);

questionRouter.patch('/:action/:questionid/',
  validateAccessToken,
  questioncontrollers.handleSubscription);

export default questionRouter;

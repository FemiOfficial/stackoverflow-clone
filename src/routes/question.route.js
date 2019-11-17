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

export default questionRouter;

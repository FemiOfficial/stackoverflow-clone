import express from 'express';
import trimInputs from '../middlewares/trimInputs';
import { validateLoginPayload, validateRegistrationPayload } from '../middlewares/auth.validations';
import authcontrollers from '../controllers/auth.controllers';

const authRouter = express.Router();

authRouter.post('/signin',
  trimInputs,
  validateLoginPayload,
  authcontrollers.login);

authRouter.post('/signup',
  trimInputs,
  validateRegistrationPayload,
  authcontrollers.register);

export default authRouter;

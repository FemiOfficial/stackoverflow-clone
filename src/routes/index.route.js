import express from 'express';
import path from 'path';
import authRoutes from './auth.route';
import userRoutes from './users.routes';
import questionRoutes from './question.route';
import answerRoutes from './answers.route';

const indexRouter = express.Router();

indexRouter.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../../README.md'));
});

indexRouter.use('/auth', authRoutes);

indexRouter.use('/users', userRoutes);

indexRouter.use('/questions', questionRoutes);

indexRouter.use('/answers', answerRoutes);

export default indexRouter;

import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './users.routes';
import questionRoutes from './question.route';
import answerRoutes from './answers.route';

const indexRouter = express.Router();

indexRouter.use('/auth', authRoutes);

indexRouter.use('/users', userRoutes);

indexRouter.use('/questions', questionRoutes);

indexRouter.use('/answers', answerRoutes);

export default indexRouter;

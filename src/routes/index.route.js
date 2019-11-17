import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './users.routes';
import questionRoutes from './question.route';

const indexRouter = express.Router();

indexRouter.use('/auth', authRoutes);

indexRouter.use('/users', userRoutes);

indexRouter.use('/questions', questionRoutes);

export default indexRouter;

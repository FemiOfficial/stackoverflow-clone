import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './users.routes';

const indexRouter = express.Router();

indexRouter.use('/auth', authRoutes);

indexRouter.use('/users', userRoutes);

export default indexRouter;

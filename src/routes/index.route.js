import express from 'express';
import authRoutes from './auth.route';

const indexRouter = express.Router();

indexRouter.use('/auth', authRoutes);

export default indexRouter;

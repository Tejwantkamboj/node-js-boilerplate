import { Router } from 'express';
const authRouter = Router();
import authRoutes from './auth.route.js';

authRouter.use('/', authRoutes);

export default authRouter;

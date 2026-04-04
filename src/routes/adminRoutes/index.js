import userRouter from './user.route.js';
import { Router } from 'express';
const adminRouter = Router();

adminRouter.use('/user', userRouter);
export default adminRouter;

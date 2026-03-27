import profileRouter from './profile.route.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.use('/profile', profileRouter);

export default userRouter;

import { Router } from 'express';
const router = Router();
import CommonRoutes from './commonRoutes/index.js';
import authRoutes from './authRoutes/auth.route.js';
import userRoutes from './userRoutes/index.js';
import path from 'path';

const defaultRoutes = [
  {
    path: '/',
    route: CommonRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

import { Router } from 'express';
const router = Router();
import authRoutes from './authRoutes/auth.route.js';

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

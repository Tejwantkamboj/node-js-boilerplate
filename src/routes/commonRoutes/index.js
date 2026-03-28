import { Router } from 'express';
const router = Router();
import notificationRoutes from './notification.routes.js';

const defaultRoutes = [
  {
    path: '/notification',
    route: notificationRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

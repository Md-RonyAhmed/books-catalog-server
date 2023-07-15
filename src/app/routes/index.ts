import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { booksRoutes } from '../modules/books/books.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: booksRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

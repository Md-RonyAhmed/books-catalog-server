"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { AuthRoutes } from '../modules/auth/auth.route';
const books_route_1 = require("../modules/books/books.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    // {
    //   path: '/auth',
    //   route: AuthRoutes,
    // },
    {
        path: '/books',
        route: books_route_1.BooksRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

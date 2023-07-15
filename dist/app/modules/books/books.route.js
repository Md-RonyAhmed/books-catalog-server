"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router
    .post('/create-book', (0, auth_1.default)()
//     BooksController.createBook
)
    .get('/', books_controller_1.BooksController.getAllBooks);
exports.BooksRoutes = router;

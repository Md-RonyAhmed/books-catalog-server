"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendApiResponse_1 = __importDefault(require("../../../shared/sendApiResponse"));
const http_status_1 = __importDefault(require("http-status"));
const books_service_1 = require("./books.service");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const books_constant_1 = require("./books.constant");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = __rest(req.body, []);
    const user = req === null || req === void 0 ? void 0 : req.user;
    const data = yield books_service_1.BooksService.createBook(books, user);
    (0, sendApiResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books added successfully!',
        data,
    });
}));
//get all Books
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, books_constant_1.booksFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const data = yield books_service_1.BooksService.getAllBooks(filters, paginationOptions);
    (0, sendApiResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books retrieved successfully!',
        meta: data.meta,
        data: data.data,
    });
}));
//get a Book
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield books_service_1.BooksService.getSingleBook(id);
    (0, sendApiResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book retrieved successfully!',
        data,
    });
}));
exports.BooksController = { createBook, getAllBooks, getSingleBook };

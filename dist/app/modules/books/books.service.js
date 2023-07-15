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
exports.BooksService = exports.createBook = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const books_model_1 = require("./books.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const books_constant_1 = require("./books.constant");
//create a new book into database
const createBook = (book, user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield books_model_1.Books.create(Object.assign(Object.assign({}, book), { userId: user === null || user === void 0 ? void 0 : user._id }));
    if (!createdBook) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Book!');
    }
    return createdBook;
});
exports.createBook = createBook;
//get all books from db
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_constant_1.booksSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const data = yield books_model_1.Books.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield books_model_1.Books.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data,
    };
});
//get a single book from the database
// const getSinglebook = async (id: string): Promise<Ibook | null> => {
//   const data = await book.findById(id).populate('seller');
//   return data;
// };
// update the book into database
// const updatebook = async (
//   id: string,
//   user: JwtPayload | null,
//   payload: Partial<Ibook>
// ): Promise<Ibook | null> => {
//   const book = await book.findOne({ _id: id }).populate('seller');
//   if (!book) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
//   }
//   if ((book?.seller as IUser)._id?.toString() !== user?._id.toString()) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
//   }
//   await book.updateOne({ _id: id }, payload);
//   // Retrieve the updated book after the update operation
//   const updatedbook = await book.findOne({ _id: id }).populate('seller');
//   return updatedbook;
// };
// delete the book from the database
// const deletebook = async (
//   id: string,
//   user: JwtPayload | null
// ): Promise<Ibook | null> => {
//   const book = await book.findOne({ _id: id }).populate('seller');
//   if (!book) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'book not found');
//   }
//   if ((book?.seller as IUser)._id?.toString() !== user?._id.toString()) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
//   }
//   const data = await book.findByIdAndDelete(id).populate('seller');
//   return data;
// };
exports.BooksService = {
    createBook: exports.createBook,
    getAllBooks,
    //   getSinglebook,
    //   updatebook,
    //   deletebook,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendApiResponse from '../../../shared/sendApiResponse';
import httpStatus from 'http-status';
import { IBooks } from './books.interface';
import { BooksService } from './books.service';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { booksFilterableFields } from './books.constant';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...books } = req.body;
  const user = req?.user;
  const data = await BooksService.createBook(books, user);

  sendApiResponse<IBooks>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books added successfully!',
    data,
  });
});

//get all Books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const data = await BooksService.getAllBooks(filters, paginationOptions);

  sendApiResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully!',
    meta: data.meta,
    data: data.data,
  });
});

//get a Book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await BooksService.getSingleBook(id);

  sendApiResponse<IBooks>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully!',
    data,
  });
});

export const BooksController = { createBook, getAllBooks, getSingleBook };

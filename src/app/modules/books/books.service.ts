/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { SortOrder } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { IBooks, IBooksFilters } from './books.interface';
import { Books } from './books.model';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { booksSearchableFields } from './books.constant';

//create a new book into database
export const createBook = async (
  book: IBooks,
  user: JwtPayload | null
): Promise<IBooks | null> => {
  const createdBook = await Books.create({
    ...book,
    userId: user?._id,
  });

  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Book!');
  }

  return createdBook;
};

//get all books from db
const getAllBooks = async (
  filters: IBooksFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooks[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: booksSearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const data = await Books.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Books.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data,
  };
};

// get a single book from the database
const getSingleBook = async (id: string): Promise<IBooks | null> => {
  const data = await Books.findById(id);
  return data;
};

// update the book into databa
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

export const BooksService = {
  createBook,
  getAllBooks,
  getSingleBook,
  //   updatebook,
  //   deletebook,
};

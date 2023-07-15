/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose';

export interface IBooks {
  title: string;
  author: string;
  thumbnail?: string;
  genre: string;
  published: Date;
  userId?: string;
  reviews?: string[];
}

export type IBooksFilters = {
  searchTerm?: string;
};

export type BooksModel = Model<IBooks, Record<string, unknown>>;

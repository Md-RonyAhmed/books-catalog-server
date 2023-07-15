import { Schema, model } from 'mongoose';
import { BooksModel, IBooks } from './books.interface';

const BooksSchema = new Schema<IBooks, BooksModel>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String },
    published: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Books = model<IBooks, BooksModel>('Books', BooksSchema);

import express from 'express';
import auth from '../../middlewares/auth';
import { BooksController } from './books.controller';

const router = express.Router();

router
  .post(
    '/create-book',
    auth()
    //     BooksController.createBook
  )
  .get('/', BooksController.getAllBooks)
  .get('/:id', BooksController.getSingleBook);

export const BooksRoutes = router;

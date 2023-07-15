import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from '../src/app/routes/index';

//create app
const app: Application = express();

// use cors
app.use(cors());

// json parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

// url parser
app.use(express.urlencoded({ extended: true }));

//application route
app.use('/api/v1', routes);

//home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to our application');
});

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;

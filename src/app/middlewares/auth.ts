import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);

    req.user = verifiedUser; //userId

    if (!verifiedUser) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;

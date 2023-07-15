import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  data: T;
};

export type IApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    count: number;
  };
  data?: T | null;
};

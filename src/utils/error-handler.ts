import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import AppError from './AppError';
import logger from '../logger';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      code: 400,
      error: {
        body: err.body,
        type: err.type,
      },
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      code: 400,
      error: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.code).json({
      code: err.code,
      error: err.error,
    });
  }

  logger.error(err);

  return res.status(500).json({
    code: 500,
    error: 'Internal server error.',
  });
};

export default errorHandler;

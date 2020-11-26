import express, { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ code: 400, error: error.errors });
  }

  console.error(error);

  return res.status(500).json({ code: 500, error: 'Internal server error.' });
};

export default errorHandler;

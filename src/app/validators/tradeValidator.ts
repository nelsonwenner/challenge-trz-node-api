import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response, NextFunction } from 'express';
import AppError from '@src/utils/AppError';
import * as Yup from 'yup';

interface BodyDTO {
  senderId: string;
  targetId: string;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.params);

  return next();
};

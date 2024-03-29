import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response, NextFunction } from 'express';
import AppError from '@src/utils/AppError';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object({
    latitude: Yup.number().max(90).min(-90).required(),
    longitude: Yup.number().max(180).min(-180).required(),
  }).required();

  await schema.validate(req.body, { abortEarly: false });

  const survivor = await SurvivorRepository.getSurvivor(req.params.survivorId);

  if (!survivor) {
    throw new AppError('Survivor does not exists', 404);
  }

  req.user = survivor;

  return next();
};

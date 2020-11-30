import { SurvivorRepository } from '@src/app/repositories/SurvivorRepository';
import { Request, Response, NextFunction } from 'express';
import AppError from '@src/utils/AppError';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object({
    survivorId: Yup.string().required(),
    latitude: Yup.number().max(180).min(-180).required(),
    longitude: Yup.number().max(180).min(-180).required(),
  }).required();

  await schema.validate(req.body, { abortEarly: false });

  const survivor = await SurvivorRepository.getSurvivor(req.body.survivorId);

  if (!survivor) {
    throw new AppError('Survivor does not exists', 404);
  }

  req.user = survivor;

  return next();
};

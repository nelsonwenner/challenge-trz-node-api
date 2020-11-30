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
    senderId: Yup.string().required(),
    targetId: Yup.string().required(),
  }).required();

  await schema.validate(req.body, { abortEarly: false });

  const sender = await SurvivorRepository.getSurvivor(req.body.survivorId);
  const target = await SurvivorRepository.getSurvivor(req.body.survivorId);

  if (!sender || !target) {
    throw new AppError('Survivor does not exists', 404);
  }

  req.user = {
    sender,
    target,
  };

  return next();
};

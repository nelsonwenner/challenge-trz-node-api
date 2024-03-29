import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response, NextFunction } from 'express';
import AppError from '@src/utils/AppError';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schemaParm = Yup.object({
    senderId: Yup.string().required(),
    targetId: Yup.string().required(),
  }).required();

  const schemaBody = Yup.object({
    sender: Yup.array(
      Yup.object({
        itemId: Yup.string().required(),
        quantity: Yup.number().integer().required(),
      })
    )
      .max(4)
      .required(),
    target: Yup.array(
      Yup.object({
        itemId: Yup.string().required(),
        quantity: Yup.number().integer().required(),
      })
    )
      .max(4)
      .required(),
  }).required();

  await schemaParm.validate(req.params, { abortEarly: false });
  await schemaBody.validate(req.body, { abortEarly: false });

  const { senderId, targetId } = req.params;

  if (senderId === targetId) {
    throw new AppError('You can not self-trade', 400);
  }

  const senderSurvivor = await SurvivorRepository.getSurvivor(senderId);
  const targetSurvivor = await SurvivorRepository.getSurvivor(targetId);

  if (!senderSurvivor || !targetSurvivor) {
    throw new AppError('Survivor does not exists', 404);
  }

  if (senderSurvivor.infected || targetSurvivor.infected) {
    throw new AppError('Survivor infected', 400);
  }

  req.user = {
    senderSurvivor: senderSurvivor,
    targetSurvivor: targetSurvivor,
  };

  return next();
};

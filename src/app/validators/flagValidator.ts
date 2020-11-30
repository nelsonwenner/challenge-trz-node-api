import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { FlagRepository } from '../repositories/FlagRepository';
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
  const schema = Yup.object({
    senderId: Yup.string().required(),
    targetId: Yup.string().required(),
  }).required();

  await schema.validate(req.body, { abortEarly: false });

  const { senderId, targetId } = req.body as BodyDTO;

  if (senderId === targetId) {
    throw new AppError('You can not self-flag', 400);
  }

  const sender = await SurvivorRepository.getSurvivor(senderId);
  const target = await SurvivorRepository.getSurvivor(targetId);

  if (!sender || !target) {
    throw new AppError('Survivor does not exists', 404);
  }

  if (sender.infected || target.infected) {
    throw new AppError('Survivor infected', 400);
  }

  const senderAlreadyFlagTarget = await FlagRepository.alreadyFlagTarget({
    sender,
    target,
  });

  if (senderAlreadyFlagTarget) {
    throw new AppError('Sender already flag target', 400);
  }

  req.user = {
    sender,
    target,
  };

  return next();
};

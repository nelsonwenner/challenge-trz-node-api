import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response, NextFunction } from 'express';
import AppError from '@src/utils/AppError';
import * as Yup from 'yup';

interface ItemDTO {
  itemId: string;
  quantity: number;
}
interface InventaryDTO extends Array<ItemDTO> {}
interface BodyDTO {
  sender: InventaryDTO;
  target: InventaryDTO;
}

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

  const { sender, target } = req.body as BodyDTO;
  const { senderId, targetId } = req.params;

  return next();
};

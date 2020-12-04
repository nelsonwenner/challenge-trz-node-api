import { InventoryRepository } from '../repositories/InventoryRepository';
import { Request, Response, NextFunction } from 'express';
import SurvivorEntity from '../models/Survivor';
import AppError from '@src/utils/AppError';

interface ItemDTO {
  itemId: string;
  quantity: number;
}
interface InventaryDTO extends Array<ItemDTO> {}
interface BodyDTO {
  sender: InventaryDTO;
  target: InventaryDTO;
}

interface UserDTO {
  senderSurvivor: SurvivorEntity;
  targetSurvivor: SurvivorEntity;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { senderSurvivor, targetSurvivor } = req.user as UserDTO;
  const { sender, target } = req.body as BodyDTO;

  const senderResource = InventoryRepository.verifyResource(
    sender,
    senderSurvivor.inventory.resource,
    'Sender'
  );

  const targetResource = InventoryRepository.verifyResource(
    target,
    targetSurvivor.inventory.resource,
    'Target'
  );

  if (!senderResource.isValid || !targetResource.isValid) {
    throw new AppError(
      `${
        !senderResource.isValid
          ? senderResource.type
          : !targetResource.isValid && targetResource.type
      }: does not have the declared items quantity`,
      400
    );
  }

  if (senderResource.points != targetResource.points) {
    throw new AppError(`Incompatible resource points`, 400);
  }

  return next();
};

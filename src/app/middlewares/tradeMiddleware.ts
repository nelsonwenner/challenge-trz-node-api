import { InventoryRepository } from '../repositories/InventoryRepository';
import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response, NextFunction } from 'express';
import SurvivorEntity from '../models/Survivor';
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

  const isValid = InventoryRepository.verifyResource(
    sender,
    senderSurvivor.inventory.resource
  );
  console.log(senderSurvivor.inventory.resource);
  /*
    senderSurvivor.inventory.resource.forEach(i => {
      console.log(i.id);
    })
    */

  //console.log("\nTEST => ", isValid);

  return next();
};

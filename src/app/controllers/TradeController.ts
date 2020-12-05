import { InventoryRepository } from '@src/app/repositories/InventoryRepository';
import SurvivorEntity from '../models/Survivor';
import { Request, Response } from 'express';
import AppError from '@src/utils/AppError';
import { getConnection } from 'typeorm';

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

export default class TradeController {
  public static async update(req: Request, res: Response): Promise<Response> {
    const { senderSurvivor, targetSurvivor } = req.user as UserDTO;
    const { sender, target } = req.body as BodyDTO;

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      await InventoryRepository.swap(
        sender,
        senderSurvivor.inventory.resource,
        targetSurvivor.inventory.resource,
        queryRunner
      );

      await InventoryRepository.swap(
        target,
        targetSurvivor.inventory.resource,
        senderSurvivor.inventory.resource,
        queryRunner
      );

      await queryRunner.commitTransaction();

      return res.status(200).json();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new AppError('Internal server error.', 500);
    } finally {
      await queryRunner.release();
    }
  }
}

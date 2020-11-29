import { InventoryRepository } from '../repositories/InventoryRepository';
import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { LocationRepository } from '../repositories/LocationRepository';
import { ResourceRepository } from '../repositories/ResourceRepository';
import InventoryEntity from '../models/Inventory';
import SurvivorEntity from '../models/Survivor';
import LocationEntity from '../models/Location';
import { Request, Response } from 'express';
import AppError from '@src/utils/AppError';
import { getConnection } from 'typeorm';

interface ItemDTO {
  itemId: string;
  quantity: number;
}
interface LocationDTO {
  latitude: number;
  longitude: number;
}
interface InventaryDTO extends Array<ItemDTO> {}
interface BodyDTO {
  name: string;
  age: number;
  sex: string;
  inventory: InventaryDTO;
  location: LocationDTO;
}

export default class SurvivorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { inventory, location, ...data } = req.body as BodyDTO;

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const dataSurvivor: SurvivorEntity = await SurvivorRepository.create(
        data,
        queryRunner
      );
      const dataInventory: InventoryEntity = await InventoryRepository.create(
        ({
          survivor: dataSurvivor.id,
        } as unknown) as InventoryEntity,
        queryRunner
      );
      await LocationRepository.create(
        ({
          survivor: dataSurvivor.id,
          ...location,
        } as unknown) as LocationEntity,
        queryRunner
      );

      const resources = inventory.map((item) => ({
        inventory: dataInventory.id,
        item: item.itemId,
        quantity: item.quantity,
      }));

      await ResourceRepository.create(resources, queryRunner);

      await queryRunner.commitTransaction();

      return res.status(201).json({ id: dataSurvivor.id });
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new AppError('Internal server error.', 500);
    } finally {
      await queryRunner.release();
    }
  }
}

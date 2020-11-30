import SurvivorEntity from '@src/app/models/Survivor';
import InventoryEntity from '../models/Inventory';
import { QueryRunner } from 'typeorm';

export class InventoryRepository {
  public static async create(
    survivor: SurvivorEntity,
    queryRunner: QueryRunner
  ): Promise<InventoryEntity> {
    const { connection } = queryRunner;
    const inventoryRepository = connection.getRepository(InventoryEntity);
    const inventory = inventoryRepository.create(survivor);
    inventory.survivor = survivor;
    await inventoryRepository.save(inventory);
    return inventory;
  }
}

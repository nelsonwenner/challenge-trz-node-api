import InventoryEntity from '../models/Inventory';
import { QueryRunner } from 'typeorm';

export class InventoryRepository {
  public static async create(
    data: InventoryEntity,
    queryRunner: QueryRunner
  ): Promise<InventoryEntity> {
    const { connection } = queryRunner;
    const inventoryRepository = connection.getRepository(InventoryEntity);
    const inventory = inventoryRepository.create(data);
    inventory.survivor = data.survivor;
    await inventoryRepository.save(inventory);
    return inventory;
  }
}

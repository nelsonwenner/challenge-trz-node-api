import { getRepository, EntityManager } from 'typeorm';
import InventoryEntity from '../models/Inventory';

export class InventoryRepository {
  public static async create(
    data: InventoryEntity,
    transaction: EntityManager
  ): Promise<InventoryEntity> {
    const inventoryRepository = getRepository(InventoryEntity);
    const inventory = inventoryRepository.create(data);
    inventory.survivor = data.survivor;
    await transaction.save(inventory);
    return inventory;
  }
}

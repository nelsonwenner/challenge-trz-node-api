import InventoryEntity from '../models/Inventory';
import SurvivorEntity from '../models/Survivor';
import ResourceEntity from '../models/Resource';
import { QueryRunner } from 'typeorm';

interface ItemDTO {
  itemId: string;
  quantity: number;
}
interface InventaryDTO extends Array<ItemDTO> {}

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

  public static verifyResource(
    inventoryAnalize: InventaryDTO,
    yoursInventory: ResourceEntity[]
  ): boolean {
    //console.log("TEST1 => ", inventoryAnalize)
    //console.log("TEST2 => ", yoursInventory)
    const isValid = inventoryAnalize.map((item) => {
      return yoursInventory.find((resource) => {
        //console.log(`\n${resource.id} - ${item.itemId} result: ${resource.id === item.itemId}\n`)
        if (resource.id === item.itemId) {
          //console.log(`\n${resource.id} - ${item.itemId} result: ${resource.id === item.itemId}\n`)
        }
      });
    });
    //console.log(isValid)
    return !isValid;
  }
}

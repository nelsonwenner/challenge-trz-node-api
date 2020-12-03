import InventoryEntity from '../models/Inventory';
import SurvivorEntity from '../models/Survivor';
import ResourceEntity from '../models/Resource';
import AppError from '@src/utils/AppError';
import { QueryRunner } from 'typeorm';

interface ItemDTO {
  itemId: string;
  quantity: number;
}
interface InventaryDTO extends Array<ItemDTO> {}

interface VerifyResource {
  isValid: boolean;
  type: string;
  points: number;
}

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
    yoursInventory: ResourceEntity[],
    type: string
  ): VerifyResource {
    const res = inventoryAnalize.reduce(
      (accumulator, item) => {
        const resource = yoursInventory.find(
          (resource) => resource.item.id === item.itemId
        );

        if (!resource) {
          throw new AppError(
            `${type}: item does not exists id: ${item.itemId}`,
            404
          );
        }

        if (resource.quantity < item.quantity) {
          accumulator.isValid = false;
        }

        if (resource) {
          accumulator.points += item.quantity * resource.item.value;
        }

        return accumulator;
      },
      {
        type: type,
        isValid: true,
        points: 0,
      }
    );

    return res;
  }
}

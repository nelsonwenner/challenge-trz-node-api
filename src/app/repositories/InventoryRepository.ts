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
    const result = inventoryAnalize.reduce(
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

    return result;
  }

  public static async swap(
    baseInventory: InventaryDTO,
    inventorySender: ResourceEntity[],
    inventoryTarget: ResourceEntity[],
    queryRunner: QueryRunner
  ): Promise<ResourceEntity[]> {
    const { connection } = queryRunner;

    const instances: ResourceEntity[] = [];

    baseInventory.forEach((data) => {
      inventorySender.find((sender) => {
        if (data.itemId === sender.item.id) {
          sender.quantity -= data.quantity;
          instances.push(sender);
        }
      });
      inventoryTarget.find((target) => {
        if (data.itemId === target.item.id) {
          target.quantity += data.quantity;
          instances.push(target);
        }
      });
    });

    const resourceRepository = connection.getRepository(ResourceEntity);

    const resources = await Promise.all(
      instances.map(async (resource) => await resourceRepository.save(resource))
    );

    return resources;
  }
}

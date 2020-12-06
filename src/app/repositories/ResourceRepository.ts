import { getRepository, QueryRunner } from 'typeorm';
import ResourceEntity from '../models/Resource';
import SurvivorEntity from '../models/Survivor';

interface ItemsDTO {
  'Fiji Water': number;
  'Campbell Soup': number;
  'First Aid Pouch': number;
  AK47: number;
}

export class ResourceRepository {
  public static async create(
    data: any,
    queryRunner: QueryRunner
  ): Promise<ResourceEntity[]> {
    const { connection } = queryRunner;
    const resourceRepository = connection.getRepository(ResourceEntity);
    const resource = resourceRepository.create(data);
    await resourceRepository.save(resource);
    return resource;
  }

  public static async sum(isInfected: boolean): Promise<ItemsDTO> {
    const survivorRepository = getRepository(SurvivorEntity);
    const survivor = await survivorRepository.find({
      where: { infected: isInfected },
      relations: [
        'inventory',
        'inventory.resource',
        'inventory.resource.item',
        'location',
      ],
    });

    const items = {
      'Fiji Water': 0.0,
      'Campbell Soup': 0.0,
      'First Aid Pouch': 0.0,
      AK47: 0.0,
    };

    survivor.forEach(({ inventory }) => {
      inventory.resource.forEach((resource) => {
        items[`${resource.item.name}`] += resource.quantity;
      });
    });

    return items;
  }
}

import ResourceEntity from '../models/Resource';
import { QueryRunner } from 'typeorm';

export class ResourceRepository {
  public static async create(
    data: ResourceEntity,
    queryRunner: QueryRunner
  ): Promise<ResourceEntity> {
    const { connection } = queryRunner;
    const resourceRepository = connection.getRepository(ResourceEntity);
    const resource = resourceRepository.create(data);
    resource.repository = data.repository;
    resource.item = data.item;
    await resourceRepository.save(resource);
    return resource;
  }
}

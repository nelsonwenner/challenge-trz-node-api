import ResourceEntity from '../models/Resource';
import { QueryRunner } from 'typeorm';

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
}

import SurvivorEntity from '../models/Survivor';
import { getRepository, EntityManager } from 'typeorm';

export class SurvivorRepository {
  public static async create(
    data: SurvivorEntity,
    transaction: EntityManager
  ): Promise<SurvivorEntity> {
    const survivorsRepository = getRepository(SurvivorEntity);
    const survivor = survivorsRepository.create(data);
    await transaction.save(survivor);
    return survivor;
  }
}

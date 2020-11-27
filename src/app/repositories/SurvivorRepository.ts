import SurvivorEntity from '../models/Survivor';
import { getRepository } from 'typeorm';

export class SurvivorRepository {
  public static async create(data: SurvivorEntity): Promise<SurvivorEntity> {
    const survivorsRepository = getRepository(SurvivorEntity);
    const survivor = survivorsRepository.create(data);
    await survivorsRepository.save(survivor);
    return survivor;
  }
}

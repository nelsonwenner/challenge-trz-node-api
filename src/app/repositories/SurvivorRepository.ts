import SurvivorEntity from '../models/Survivor';
import { getRepository } from 'typeorm';

interface SurvivorModel {
  name: string;
  age: number;
  sex: string;
}

export class SurvivorRepository {
  public static async create(data: SurvivorModel): Promise<SurvivorEntity> {
    const survivorsRepository = getRepository(SurvivorEntity);
    const survivor = survivorsRepository.create(data);
    await survivorsRepository.save(survivor);
    return survivor;
  }
}

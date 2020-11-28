import SurvivorEntity from '../models/Survivor';
import { QueryRunner } from 'typeorm';

interface ReqSurvivor {
  name: string;
  age: number;
  sex: string;
}

export class SurvivorRepository {
  public static async create(
    data: ReqSurvivor,
    queryRunner: QueryRunner
  ): Promise<SurvivorEntity> {
    const { connection } = queryRunner;
    const survivorsRepository = connection.getRepository(SurvivorEntity);
    const survivor = survivorsRepository.create(data);
    await survivorsRepository.save(survivor);
    return survivor;
  }
}

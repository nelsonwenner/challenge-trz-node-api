import { QueryRunner, getRepository } from 'typeorm';
import SurvivorEntity from '../models/Survivor';

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

  public static async getSurvivor(
    id: string
  ): Promise<SurvivorEntity | undefined> {
    const locationsRepository = getRepository(SurvivorEntity);
    const location = await locationsRepository.findOne({ where: { id } });
    return location;
  }
}

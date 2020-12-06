import { QueryRunner, getRepository } from 'typeorm';
import SurvivorEntity from '../models/Survivor';

interface DataDTO {
  name: string;
  age: number;
  sex: string;
}

export class SurvivorRepository {
  public static async create(
    data: DataDTO,
    queryRunner: QueryRunner
  ): Promise<SurvivorEntity> {
    const { connection } = queryRunner;
    const survivorsRepository = connection.getRepository(SurvivorEntity);
    const survivor = survivorsRepository.create(data);
    await survivorsRepository.save(survivor);
    return survivor;
  }

  public static async infect(
    target: SurvivorEntity,
    queryRunner: QueryRunner
  ): Promise<SurvivorEntity> {
    const { connection } = queryRunner;
    const survivorsRepository = connection.getRepository(SurvivorEntity);
    const survivor = await survivorsRepository.findOne({
      where: { id: target.id },
    });
    survivor.infected = true;
    await survivorsRepository.save(survivor);
    return survivor;
  }

  public static async getSurvivor(id: string): Promise<SurvivorEntity> {
    const survivorRepository = getRepository(SurvivorEntity);
    const survivor = await survivorRepository.findOne({
      where: { id },
      relations: [
        'inventory',
        'inventory.resource',
        'inventory.resource.item',
        'location',
      ],
    });
    return survivor;
  }

  public static async getAll(): Promise<SurvivorEntity[]> {
    const survivorRepository = getRepository(SurvivorEntity);
    const survivor = await survivorRepository.find({
      relations: [
        'inventory',
        'inventory.resource',
        'inventory.resource.item',
        'location',
      ],
    });
    return survivor;
  }

  public static async infectedOrNotInfected(
    isInfected: boolean
  ): Promise<number> {
    const survivorRepository = getRepository(SurvivorEntity);
    const amount = await survivorRepository.count({
      where: { infected: isInfected },
    });
    return amount;
  }
}

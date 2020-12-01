import { getRepository, QueryRunner } from 'typeorm';
import SurvivorEntity from '../models/Survivor';
import FlagEntity from '../models/Flag';

interface DataDTO {
  sender: SurvivorEntity;
  target: SurvivorEntity;
}

export class FlagRepository {
  public static async create(
    data: DataDTO,
    queryRunner: QueryRunner
  ): Promise<FlagEntity> {
    const { connection } = queryRunner;
    const flagRepository = connection.getRepository(FlagEntity);
    const flag = flagRepository.create(data);
    flag.sender = data.sender;
    flag.target = data.target;
    await flagRepository.save(flag);
    return flag;
  }

  public static async alreadyFlagTarget(data: DataDTO): Promise<FlagEntity> {
    const flagRepository = getRepository(FlagEntity);
    const flag = await flagRepository.findOne({
      where: { sender: data.sender, target: data.target },
    });
    return flag;
  }

  public static async countFlags(survivor: SurvivorEntity): Promise<number> {
    const flagRepository = getRepository(FlagEntity);
    const flags = await flagRepository.count({ target: survivor });
    return flags;
  }
}

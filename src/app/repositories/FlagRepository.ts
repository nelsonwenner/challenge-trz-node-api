import SurvivorEntity from '@src/app/models/Survivor';
import FlagEntity from '@src/app/models/Flag';
import { getRepository } from 'typeorm';

interface DataDTO {
  sender: SurvivorEntity;
  target: SurvivorEntity;
}

export class FlagRepository {
  public static async create(data: DataDTO): Promise<FlagEntity> {
    const flagRepository = getRepository(FlagEntity);
    const flag = flagRepository.create(data);
    flag.sender = data.sender;
    flag.target = data.target;
    await flagRepository.save(flag);
    return flag;
  }
}

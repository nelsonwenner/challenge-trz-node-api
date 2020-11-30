import SurvivorEntity from '@src/app/models/Survivor';
import { QueryRunner, getRepository } from 'typeorm';
import LocationEntity from '../models/Location';

interface DataTDO {
  survivor: SurvivorEntity;
  latitude: number;
  longitude: number;
}

export class LocationRepository {
  public static async create(
    data: DataTDO,
    queryRunner: QueryRunner
  ): Promise<LocationEntity> {
    const { connection } = queryRunner;
    const locationsRepository = connection.getRepository(LocationEntity);
    const location = locationsRepository.create(data);
    location.survivor = data.survivor;
    await locationsRepository.save(location);
    return location;
  }

  public static async update(data: DataTDO): Promise<LocationEntity> {
    const locationsRepository = getRepository(LocationEntity);
    const location = await locationsRepository.findOne({
      where: { survivor: data.survivor },
    });
    location.latitude = data.latitude;
    location.longitude = data.longitude;
    await locationsRepository.save(location);
    return location;
  }
}

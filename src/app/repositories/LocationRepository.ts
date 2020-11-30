import { QueryRunner, getRepository } from 'typeorm';
import LocationEntity from '../models/Location';

export class LocationRepository {
  public static async create(
    data: LocationEntity,
    queryRunner: QueryRunner
  ): Promise<LocationEntity> {
    const { connection } = queryRunner;
    const locationsRepository = connection.getRepository(LocationEntity);
    const location = locationsRepository.create(data);
    location.survivor = data.survivor;
    await locationsRepository.save(location);
    return location;
  }

  public static async getLocation(
    id: string
  ): Promise<LocationEntity | undefined> {
    const locationsRepository = getRepository(LocationEntity);
    const location = locationsRepository.findOne({ id });
    return location;
  }
}

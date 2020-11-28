import LocationEntity from '../models/Location';
import { QueryRunner } from 'typeorm';

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
}

import { getRepository, EntityManager } from 'typeorm';
import LocationEntity from '../models/Location';

export class LocationRepository {
  public static async create(
    data: LocationEntity,
    transaction: EntityManager
  ): Promise<LocationEntity> {
    const locationsRepository = getRepository(LocationEntity);
    const location = locationsRepository.create(data);
    location.survivor = data.survivor;
    await transaction.save(location);
    return location;
  }
}

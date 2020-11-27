import LocationEntity from '../models/Location';
import { getRepository } from 'typeorm';

export class LocationRepository {
  public static async create(data: LocationEntity): Promise<LocationEntity> {
    const locationsRepository = getRepository(LocationEntity);
    const location = locationsRepository.create(data);
    location.survivor = data.survivor;
    await locationsRepository.save(location);
    return location;
  }
}

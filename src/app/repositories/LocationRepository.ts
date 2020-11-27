import LocationEntity from '../models/Survivor';
import { getRepository } from 'typeorm';

export class LocationRepository {
  public static async create(data: LocationEntity): Promise<LocationEntity> {
    const locationsRepository = getRepository(LocationEntity);
    const location = locationsRepository.create(data);
    await locationsRepository.save(location);
    return location;
  }
}

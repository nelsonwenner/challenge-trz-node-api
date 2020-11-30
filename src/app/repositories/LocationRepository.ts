import { QueryRunner, getRepository } from 'typeorm';
import LocationEntity from '../models/Location';

interface DataTDO {
  survivorId: string;
  latitude: number;
  longitude: number;
}

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

  public static async update(
    survivorId: string,
    data: DataTDO
  ): Promise<LocationEntity> {
    const locationsRepository = getRepository(LocationEntity);
    const location = await locationsRepository.findOne({
      where: { survivor: survivorId },
    });
    location.latitude = data.latitude;
    location.longitude = data.longitude;
    await locationsRepository.save(location);
    return location;
  }
}

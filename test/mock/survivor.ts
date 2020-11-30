import { InventoryRepository } from '@src/app/repositories/InventoryRepository';
import { SurvivorRepository } from '@src/app/repositories/SurvivorRepository';
import { LocationRepository } from '@src/app/repositories/LocationRepository';
import { ResourceRepository } from '@src/app/repositories/ResourceRepository';
import InventoryEntity from '@src/app/models/Inventory';
import SurvivorEntity from '@src/app/models/Survivor';
import LocationEntity from '@src/app/models/Location';
import { getConnection } from 'typeorm';
import {
  idCampbellSoup,
  idFijiWater,
  idFirstAidPouch,
  idAK47,
} from '../mock/items';
import random from 'random';
import faker from 'faker';

interface ItemModel {
  itemId: string;
  quantity: number;
}

interface LocationModel {
  latitude: number;
  longitude: number;
}

interface SurvivorModel {
  name: string;
  age: number;
  sex: string;
  inventory: ItemModel[];
  location: LocationModel;
}

export const name = (): string => faker.name.findName();
export const age = (): number => random.int(18, 50);
export const sex = (): string => (random.int(0, 1) === 1 ? 'male' : 'female');
export const latitude = (): number => parseInt(faker.address.latitude());
export const longitude = (): number => parseInt(faker.address.longitude());
export const numberRandom = (): number => random.int(10, 20);
export const item = (id: string): ItemModel => {
  return { itemId: id, quantity: random.int(10, 20) };
};

export const mockSurvivorModel = (): SurvivorModel => {
  return {
    name: name(),
    age: age(),
    sex: sex(),
    inventory: [
      item(idCampbellSoup()),
      item(idFirstAidPouch()),
      item(idFijiWater()),
      item(idAK47()),
    ],
    location: {
      latitude: latitude(),
      longitude: longitude(),
    },
  };
};

export const createSurvivor = async (): Promise<string> => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

  const { inventory, location, ...data } = mockSurvivorModel();

  const dataSurvivor = await SurvivorRepository.create(data, queryRunner);
  const dataInventory = await InventoryRepository.create(
    ({
      survivor: dataSurvivor.id,
    } as unknown) as InventoryEntity,
    queryRunner
  );
  await LocationRepository.create(
    ({
      survivor: dataSurvivor.id,
      ...location,
    } as unknown) as LocationEntity,
    queryRunner
  );

  const resources = inventory.map((item) => ({
    inventory: dataInventory.id,
    item: item.itemId,
    quantity: item.quantity,
  }));

  await ResourceRepository.create(resources, queryRunner);
  return dataSurvivor.id;
};

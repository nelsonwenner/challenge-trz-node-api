import { InventoryRepository } from '@src/app/repositories/InventoryRepository';
import { SurvivorRepository } from '@src/app/repositories/SurvivorRepository';
import { LocationRepository } from '@src/app/repositories/LocationRepository';
import { ResourceRepository } from '@src/app/repositories/ResourceRepository';
import SurvivorEntity from '@src/app/models/Survivor';
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

export const createSurvivor = async (): Promise<SurvivorEntity> => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

  const { inventory, location, ...data } = mockSurvivorModel();

  const survivorData = await SurvivorRepository.create(data, queryRunner);

  const dataInventory = await InventoryRepository.create(
    survivorData,
    queryRunner
  );

  await LocationRepository.create(
    {
      survivor: survivorData,
      ...location,
    },
    queryRunner
  );

  const resources = inventory.map((item) => ({
    inventory: dataInventory.id,
    item: item.itemId,
    quantity: item.quantity,
  }));

  await ResourceRepository.create(resources, queryRunner);
  return survivorData;
};

import { InventoryRepository } from '@src/app/repositories/InventoryRepository';
import { SurvivorRepository } from '@src/app/repositories/SurvivorRepository';
import { LocationRepository } from '@src/app/repositories/LocationRepository';
import { ResourceRepository } from '@src/app/repositories/ResourceRepository';
import SurvivorEntity from '@src/app/models/Survivor';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
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
  infected: boolean;
  inventory: ItemModel[];
  location: LocationModel;
}

export const name = (): string => faker.name.findName();
export const age = (): number => random.int(18, 50);
export const sex = (): string => (random.int(0, 1) === 1 ? 'male' : 'female');
export const latitude = (): number => parseInt(faker.address.latitude());
export const longitude = (): number => parseInt(faker.address.longitude());
export const numberRandom = (): number => random.int(10, 20);
export const uuid = (): string => uuidv4();
export const item = (id: string, quantity = random.int(10, 20)): ItemModel => {
  return { itemId: id, quantity: quantity };
};

export const mockSurvivorModel = (flag = false): SurvivorModel => {
  return {
    name: name(),
    age: age(),
    sex: sex(),
    infected: flag,
    inventory: [
      item(idCampbellSoup(), 10),
      item(idFirstAidPouch(), 15),
      item(idFijiWater(), 20),
      item(idAK47(), 15),
    ],
    location: {
      latitude: latitude(),
      longitude: longitude(),
    },
  };
};

export const createSurvivor = async (flag = false): Promise<SurvivorEntity> => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

  const { inventory, location, ...data } = mockSurvivorModel(flag);

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

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
    inventory: [],
    location: {
      latitude: latitude(),
      longitude: longitude(),
    },
  };
};

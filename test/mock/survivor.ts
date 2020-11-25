import random from 'random';
import faker from 'faker';

interface ItemModel {
  item: number;
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
export const item = (id: number): ItemModel => {
  return { item: id, quantity: random.int(10, 20) };
};

export const mockSurvivorModel = (): SurvivorModel => {
  return {
    name: name(),
    age: age(),
    sex: sex(),
    inventory: [item(1), item(2), item(3), item(4)],
    location: {
      latitude: latitude(),
      longitude: longitude(),
    },
  };
};

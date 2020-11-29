import {
  name,
  age,
  sex,
  item,
  latitude,
  longitude,
  numberRandom,
} from '../mock/survivor';
import {
  idCampbellSoup,
  idFijiWater,
  idFirstAidPouch,
  idAK47,
} from '../mock/items';
import { connect } from '@src/config/database/database';
import { Connection } from 'typeorm';

const prefix = '/survivors';

let connection: Connection;

describe('Survivor unitary test', () => {
  beforeAll(async () => {
    connection = await connect('tes-connection');

    await connection.query('DROP TABLE IF EXISTS locations');
    await connection.query('DROP TABLE IF EXISTS resources');
    await connection.query('DROP TABLE IF EXISTS items');
    await connection.query('DROP TABLE IF EXISTS inventories');
    await connection.query('DROP TABLE IF EXISTS survivors');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM locations');
    await connection.query('DELETE FROM resources');
    await connection.query('DELETE FROM inventories');
    await connection.query('DELETE FROM survivors');
  });

  afterEach(async () => {
    await connection.query('DELETE FROM locations');
    await connection.query('DELETE FROM resources');
    await connection.query('DELETE FROM inventories');
    await connection.query('DELETE FROM survivors');
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('When creating a new survivor', () => {
    test('Should return 400 if name does not is provided', async () => {
      const reqFake = {
        age: age(),
        sex: sex(),
        inventory: [item(idCampbellSoup())],
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['name is a required field'],
      });
    });

    test('Should return 400 if age does not is provided', async () => {
      const reqFake = {
        name: name(),
        sex: sex(),
        inventory: [item(idCampbellSoup())],
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['age is a required field'],
      });
    });

    test('Should return 400 if sex does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        inventory: [item(idCampbellSoup())],
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['sex is a required field'],
      });
    });

    test('Should return 400 if inventory does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['inventory is a required field'],
      });
    });

    test('Should return 400 if itemId does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [{ quantity: numberRandom() }],
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['inventory[0].itemId is a required field'],
      });
    });

    test('Should return 400 if quantity does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [{ itemId: idCampbellSoup() }],
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['inventory[0].quantity is a required field'],
      });
    });

    test('Should return 400 if location does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [item(idCampbellSoup())],
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: [
          'location.latitude is a required field',
          'location.longitude is a required field',
        ],
      });
    });

    test('Should return 400 if latitude does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [item(idCampbellSoup())],
        location: {
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['location.latitude is a required field'],
      });
    });

    test('Should return 201 when creating a new survivor', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [
          item(idCampbellSoup()),
          item(idFijiWater()),
          item(idFirstAidPouch()),
          item(idAK47()),
        ],
        location: {
          latitude: latitude(),
          longitude: longitude(),
        },
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(201);
    });
  });
});

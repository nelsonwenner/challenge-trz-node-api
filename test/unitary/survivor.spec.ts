import { json } from 'express';
import { name, age, sex, item, latitude, longitude } from '../mock/survivor';

const prefix = '/survivors';

describe('Survivor unitary test', () => {
  describe('When creating a new survivor', () => {
    test('Should return 400 if name does not is provided', async () => {
      const reqFake = {
        age: age(),
        sex: sex(),
        inventory: [item(1)],
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
        inventory: [item(1)],
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
        inventory: [item(1)],
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

    test('Should return 400 if location does not is provided', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [item(1)],
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

    test('Should return 201 when creating a new survivor', async () => {
      const reqFake = {
        name: name(),
        age: age(),
        sex: sex(),
        inventory: [item(1)],
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

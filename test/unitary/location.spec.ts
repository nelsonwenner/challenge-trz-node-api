import { latitude, longitude, createSurvivor } from '../mock/survivor';

const prefix = '/locations';

describe('Location unitary test', () => {
  describe('When update a location', () => {
    test('Should return 400 if survivorId does not is provided', async () => {
      const reqFake = {
        latitude: latitude(),
        longitude: longitude(),
      };

      const res = await global.testRequest.put(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['survivorId is a required field'],
      });
    });

    test('Should return 400 if latitude does not is provided', async () => {
      const reqFake = {
        survivorId: 'e8045711-d1b1-3341-78bf-5111269121ab',
        longitude: longitude(),
      };

      const res = await global.testRequest.put(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['latitude is a required field'],
      });
    });

    test('Should return 400 if longitude does not is provided', async () => {
      const reqFake = {
        survivorId: 'e8045711-d1b1-3341-78bf-5111269121ab',
        latitude: latitude(),
      };

      const res = await global.testRequest.put(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['longitude is a required field'],
      });
    });

    test('Should return 404 if survivor does not exists', async () => {
      const reqFake = {
        survivorId: 'e8045711-d1b1-3341-78bf-5111269121ab',
        latitude: latitude(),
        longitude: longitude(),
      };

      const res = await global.testRequest.put(prefix).send(reqFake);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        code: 404,
        error: 'Survivor does not exists',
      });
    });

    test('Should return 200 if location update with success', async () => {
      const survivor = await createSurvivor();

      const reqFake = {
        survivorId: survivor.id,
        latitude: 100.6546578,
        longitude: -100.6546578,
      };

      const res = await global.testRequest.put(prefix).send(reqFake);

      expect(res.status).toBe(200);
    });
  });
});
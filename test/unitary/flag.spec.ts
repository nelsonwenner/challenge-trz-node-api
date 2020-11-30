import { createSurvivor } from '../mock/survivor';

const prefix = '/flags';

describe('Flag unitary test', () => {
  describe('When create a flag', () => {
    test('Should return 400 if senderId does not is provided', async () => {
      const reqFake = {
        targetId: '0c82ac00-6994-45b4-9b5a-891183f3c5ef',
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['senderId is a required field'],
      });
    });

    test('Should return 400 if targetId does not is provided', async () => {
      const reqFake = {
        senderId: '0c82ac00-6994-45b4-9b5a-891183f3c5ef',
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['targetId is a required field'],
      });
    });

    test('Should return 404 if survivor does not exists ', async () => {
      const reqFake = {
        senderId: '0c25ac00-1221-12b3-2b2a-123456f3c7ef',
        targetId: '0c75ac00-6994-45b4-9b5a-891185f3c7ef',
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        code: 404,
        error: 'Survivor does not exists',
      });
    });
  });
});

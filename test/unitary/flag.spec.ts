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
  });
});

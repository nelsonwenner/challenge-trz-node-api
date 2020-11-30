import { latitude, longitude } from '../mock/survivor';

const prefix = '/locations';

describe('Location unitary test', () => {
  describe('When update a location', () => {
    test('Should return 400 if latitude does not is provided', async () => {
      const reqFake = {};

      const res = await global.testRequest.put(prefix).send(reqFake);

      expect(res.status).toBe(400);
    });
  });
});

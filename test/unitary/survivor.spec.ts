import { name, age, sex, item, latitude, longitude } from '../mock/survivor';

const prefix = '/survivors';

describe('Survivor unitary test', () => {
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
      error: 'name is a required field',
    });
  });
});

import {
  idCampbellSoup,
  idFijiWater,
  idFirstAidPouch,
  idAK47,
} from '../mock/items';
import { item, uuid } from '../mock/survivor';

const prefix = 'trades';

describe('Trade unitary test', () => {
  describe('When you make a trade', () => {
    test('Should return 400 if sender does not is provided', async () => {
      const reqFake = {
        target: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
      };

      const res = await global.testRequest
        .put(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['sender is a required field'],
      });
    });
  });
});

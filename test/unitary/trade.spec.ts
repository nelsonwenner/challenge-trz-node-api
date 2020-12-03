import {
  idCampbellSoup,
  idFijiWater,
  idFirstAidPouch,
  idAK47,
} from '../mock/items';
import { item, uuid, createSurvivor } from '../mock/survivor';

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
        .post(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['sender is a required field'],
      });
    });

    test('Should return 400 if target does not is provided', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
      };

      const res = await global.testRequest
        .post(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['target is a required field'],
      });
    });

    test('Should return 400 if itemId does not is provided', async () => {
      const reqFake = {
        sender: [{ item: idCampbellSoup(), quantity: 5 }],
        target: [{ itemId: idCampbellSoup(), quantity: 5 }],
      };

      const res = await global.testRequest
        .post(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['sender[0].itemId is a required field'],
      });
    });

    test('Should return 400 if quantity does not is provided', async () => {
      const reqFake = {
        sender: [{ itemId: idCampbellSoup() }],
        target: [{ itemId: idCampbellSoup(), quantity: 5 }],
      };

      const res = await global.testRequest
        .post(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['sender[0].quantity is a required field'],
      });
    });

    test('Should return 400 if quantity items is bigger four', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
          item(idAK47()),
        ],
        target: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
      };

      const res = await global.testRequest
        .post(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: ['sender field must have less than or equal to 4 items'],
      });
    });

    test('Should return 400 survivor can not self-trade', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
        target: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
      };

      const uuid = '477617a8-f51c-41c1-a718-58e111dc9d7e';

      const res = await global.testRequest
        .post(`/${uuid}/${prefix}/${uuid}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: 'You can not self-trade',
      });
    });

    test('Should return 400 if survivor does not exists', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
        target: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
      };

      const res = await global.testRequest
        .post(`/${uuid()}/${prefix}/${uuid()}`)
        .send(reqFake);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        code: 404,
        error: 'Survivor does not exists',
      });
    });

    test('Should return 400 if survivor is infected', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
        target: [
          item(idCampbellSoup()),
          item(idFirstAidPouch()),
          item(idFijiWater()),
          item(idAK47()),
        ],
      };

      const sender = await createSurvivor(true);
      const target = await createSurvivor();

      const res = await global.testRequest
        .post(`/${sender.id}/${prefix}/${target.id}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: 'Survivor infected',
      });
    });
  });
});

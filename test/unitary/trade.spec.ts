import { SurvivorRepository } from './../../src/app/repositories/SurvivorRepository';
import {
  idCampbellSoup,
  idFijiWater,
  idFirstAidPouch,
  idAK47,
} from '../mock/items';
import {
  item,
  uuid,
  createSurvivor,
  findResourceQuantity,
} from '../mock/survivor';

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

    test('Should return 404 if Sender item does not exists', async () => {
      const itemNotExists = uuid();

      const reqFake = {
        sender: [
          item(itemNotExists),
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

      const sender = await createSurvivor();
      const target = await createSurvivor();

      const res = await global.testRequest
        .post(`/${sender.id}/${prefix}/${target.id}`)
        .send(reqFake);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        code: 404,
        error: `Sender: item does not exists id: ${itemNotExists}`,
      });
    });

    test('Should return 400 if sender not have number of items', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup(), 10000),
          item(idFirstAidPouch(), 0),
          item(idFijiWater(), 0),
          item(idAK47(), 0),
        ],
        target: [
          item(idCampbellSoup(), 0),
          item(idFirstAidPouch(), 0),
          item(idFijiWater(), 0),
          item(idAK47(), 0),
        ],
      };

      const sender = await createSurvivor();
      const target = await createSurvivor();

      const res = await global.testRequest
        .post(`/${sender.id}/${prefix}/${target.id}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: `Sender: does not have the declared items quantity`,
      });
    });

    test('Should return 400 if target not have number of items', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup(), 0),
          item(idFirstAidPouch(), 0),
          item(idFijiWater(), 0),
          item(idAK47(), 0),
        ],
        target: [
          item(idCampbellSoup(), 10000),
          item(idFirstAidPouch(), 0),
          item(idFijiWater(), 0),
          item(idAK47(), 0),
        ],
      };

      const sender = await createSurvivor();
      const target = await createSurvivor();

      const res = await global.testRequest
        .post(`/${sender.id}/${prefix}/${target.id}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: `Target: does not have the declared items quantity`,
      });
    });

    test('Should return 400 if incompatible resource points', async () => {
      const reqFake = {
        sender: [
          item(idCampbellSoup(), 5),
          item(idFirstAidPouch(), 0),
          item(idFijiWater(), 0),
          item(idAK47(), 0),
        ],
        target: [
          item(idCampbellSoup(), 2),
          item(idFirstAidPouch(), 0),
          item(idFijiWater(), 0),
          item(idAK47(), 0),
        ],
      };

      const sender = await createSurvivor();
      const target = await createSurvivor();

      const res = await global.testRequest
        .post(`/${sender.id}/${prefix}/${target.id}`)
        .send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: `Incompatible resource points`,
      });
    });

    test('Should return 200 and make the switch. Sender: [1,0,0,1] Target: [0,1,1,0]', async () => {
      const reqFake = {
        sender: [
          item(idFijiWater(), 1),
          item(idCampbellSoup(), 0),
          item(idFirstAidPouch(), 0),
          item(idAK47(), 1),
        ],
        target: [
          item(idFijiWater(), 0),
          item(idCampbellSoup(), 1),
          item(idFirstAidPouch(), 1),
          item(idAK47(), 0),
        ],
      };

      const sender = await createSurvivor();
      const target = await createSurvivor();

      const res = await global.testRequest
        .post(`/${sender.id}/${prefix}/${target.id}`)
        .send(reqFake);

      const senderVerify = await SurvivorRepository.getSurvivor(sender.id);
      const targetVerify = await SurvivorRepository.getSurvivor(target.id);

      expect(res.status).toBe(200);

      /**
       * Trade: [1,0,0,1]
       * Sender inventory before: [10, 10, 10, 10]
       * Sender inventory after: [9, 11, 11, 9]
       */
      expect(
        findResourceQuantity(senderVerify.inventory.resource, idFijiWater())
      ).toBe(9);
      expect(
        findResourceQuantity(senderVerify.inventory.resource, idCampbellSoup())
      ).toBe(11);
      expect(
        findResourceQuantity(senderVerify.inventory.resource, idFirstAidPouch())
      ).toBe(11);
      expect(
        findResourceQuantity(senderVerify.inventory.resource, idAK47())
      ).toBe(9);

      /**
       * Trade: [0,1,1,0]
       * Target inventory before: [10, 10, 10, 10]
       * Target inventory after: [11, 9, 9, 11]
       */
      expect(
        findResourceQuantity(targetVerify.inventory.resource, idFijiWater())
      ).toBe(11);
      expect(
        findResourceQuantity(targetVerify.inventory.resource, idCampbellSoup())
      ).toBe(9);
      expect(
        findResourceQuantity(targetVerify.inventory.resource, idFirstAidPouch())
      ).toBe(9);
      expect(
        findResourceQuantity(targetVerify.inventory.resource, idAK47())
      ).toBe(11);
    });
  });
});

import { SurvivorRepository } from '@src/app/repositories/SurvivorRepository';
import { FlagRepository } from '@src/app/repositories/FlagRepository';
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

    test('Should return 400 survivor can not self-flag', async () => {
      const reqFake = {
        senderId: '0c25ac00-1221-12b3-2b2a-123456f3c7ef',
        targetId: '0c25ac00-1221-12b3-2b2a-123456f3c7ef',
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: 'You can not self-flag',
      });
    });

    test('Should return 400 if survivor is infected', async () => {
      const sender = await createSurvivor(true);
      const target = await createSurvivor();

      const reqFake = {
        senderId: sender.id,
        targetId: target.id,
      };

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: 'Survivor infected',
      });
    });

    test('Should return 400 if sender already flag target', async () => {
      const sender = await createSurvivor();
      const target = await createSurvivor();

      const reqFake = {
        senderId: sender.id,
        targetId: target.id,
      };

      await global.testRequest.post(prefix).send(reqFake);

      const res = await global.testRequest.post(prefix).send(reqFake);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        code: 400,
        error: 'Sender already flag target',
      });
    });

    test('Should return 201 when infecting a survivor flagged 5x', async () => {
      const senders = await Promise.all([
        await createSurvivor(),
        await createSurvivor(),
        await createSurvivor(),
        await createSurvivor(),
      ]);

      const sender = await createSurvivor();
      const target = await createSurvivor();

      await Promise.all([
        senders.map(
          async (sender) =>
            await global.testRequest.post(prefix).send({
              senderId: sender.id,
              targetId: target.id,
            })
        ),
      ]);

      const reqFake = {
        senderId: sender.id,
        targetId: target.id,
      };

      const res = await global.testRequest.post(prefix).send(reqFake);
      const amountFlags = await FlagRepository.countFlags(target);
      const survivor = await SurvivorRepository.getSurvivor(target.id);

      expect(res.status).toBe(201);
      expect(survivor.infected).toBe(true);
      expect(amountFlags).toBe(5);
    });
  });
});

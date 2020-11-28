import { InventoryRepository } from '../repositories/InventoryRepository';
import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { LocationRepository } from '../repositories/LocationRepository';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

export default class SurvivorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { inventory, location, ...data } = req.body;

    await getManager().transaction(async (transaction) => {
      const { id } = await SurvivorRepository.create(data, transaction);
      await InventoryRepository.create(
        { survivor: id, ...inventory },
        transaction
      );
      await LocationRepository.create(
        { survivor: id, ...location },
        transaction
      );
    });

    return res.status(201).json({});
  }
}

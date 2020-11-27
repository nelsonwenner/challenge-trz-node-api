import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { LocationRepository } from '../repositories/LocationRepository';
import { Request, Response } from 'express';

export default class SurvivorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { inventory, location, ...data } = req.body;

    const { id } = await SurvivorRepository.create(data);
    await LocationRepository.create({ survivor: id, ...location });

    return res.status(201).json({ id });
  }
}

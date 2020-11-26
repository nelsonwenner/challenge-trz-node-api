import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response } from 'express';

export default class SurvivorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { inventory, location, ...data } = req.body;

    const survivor = await SurvivorRepository.create(data);

    return res.status(201).json(survivor);
  }
}

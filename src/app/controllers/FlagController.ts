import { SurvivorRepository } from '@src/app/repositories/SurvivorRepository';
import SurvivorEntity from '@src/app/models/Survivor';
import { Request, Response } from 'express';

export default class FlagController {
  public static async create(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({});
  }
}

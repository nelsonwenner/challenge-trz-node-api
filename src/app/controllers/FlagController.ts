import { FlagRepository } from '../repositories/FlagRepository';
import SurvivorEntity from '../models/Survivor';
import { Request, Response } from 'express';

interface UserDTO {
  sender: SurvivorEntity;
  target: SurvivorEntity;
}

export default class FlagController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const flag = await FlagRepository.create(req.user as UserDTO);
    return res.status(201).send({ ...flag });
  }
}

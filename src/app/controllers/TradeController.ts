import SurvivorEntity from '../models/Survivor';
import { Request, Response } from 'express';

interface BodyTDO {
  survivor: SurvivorEntity;
  latitude: number;
  longitude: number;
}

export default class TradeController {
  public static async update(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({});
  }
}

import { LocationRepository } from '../repositories/LocationRepository';
import SurvivorEntity from '../models/Survivor';
import { Request, Response } from 'express';

interface BodyTDO {
  latitude: number;
  longitude: number;
}

export default class LocationController {
  public static async update(req: Request, res: Response): Promise<Response> {
    const data = req.body as BodyTDO;
    const location = await LocationRepository.update({
      survivor: req.user as SurvivorEntity,
      ...data,
    });
    return res.status(200).json({ ...location });
  }
}

import SurvivorEntity from '@src/app/models/Survivor';
import { LocationRepository } from '@src/app/repositories/LocationRepository';
import { Request, Response } from 'express';

interface BodyTDO {
  survivor: SurvivorEntity;
  latitude: number;
  longitude: number;
}

export default class LocationController {
  public static async update(req: Request, res: Response): Promise<Response> {
    const data = req.body as BodyTDO;
    const location = await LocationRepository.update({
      survivor: req.user,
      ...data,
    });
    return res.status(200).send({ ...location });
  }
}

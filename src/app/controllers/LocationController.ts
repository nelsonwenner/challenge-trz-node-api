import { LocationRepository } from '@src/app/repositories/LocationRepository';
import { Request, Response } from 'express';

interface BodyTDO {
  survivorId: string;
  latitude: number;
  longitude: number;
}

export default class LocationController {
  public static async update(req: Request, res: Response): Promise<Response> {
    const data = req.body as BodyTDO;
    const location = await LocationRepository.update(req.user.id, data);
    return res.status(200).send({ ...location });
  }
}

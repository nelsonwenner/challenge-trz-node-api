import { Request, Response } from 'express';

export default class LocationController {
  public static async update(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({});
  }
}

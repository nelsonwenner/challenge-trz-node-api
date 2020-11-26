import { Request, Response } from 'express';

export default class SurvivorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    return res.status(201).json({});
  }
}

import { Request, Response } from 'express';

class SurvivorController {
  async create(req: Request, res: Response): Promise<Response> {
    return res.status(201);
  }
}

export default new SurvivorController();

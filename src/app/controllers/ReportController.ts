import { Request, Response } from 'express';

export default class ReportController {
  public static async index(req: Request, res: Response): Promise<Response> {
    return res.status(200).json();
  }
}

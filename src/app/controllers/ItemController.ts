import { ItemRepository } from '../repositories/ItemRepository';
import { Request, Response } from 'express';

export default class ItemController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const items = await ItemRepository.getAll();
    return res.status(200).json(items);
  }
}

import { getRepository } from 'typeorm';
import ItemEntity from '../models/Item';

export class ItemRepository {
  public static async getAll(): Promise<ItemEntity[]> {
    const itemRepository = getRepository(ItemEntity);
    const items = await itemRepository.find();
    return items;
  }
}

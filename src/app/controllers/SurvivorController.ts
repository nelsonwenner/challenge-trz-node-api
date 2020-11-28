import { InventoryRepository } from '../repositories/InventoryRepository';
import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { LocationRepository } from '../repositories/LocationRepository';
import { Request, Response } from 'express';
import AppError from '@src/utils/AppError';
import { getConnection } from 'typeorm';

export default class SurvivorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const { inventory, location, ...data } = req.body;

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const { id } = await SurvivorRepository.create(data, queryRunner);
      await InventoryRepository.create(
        { survivor: id, ...inventory },
        queryRunner
      );
      await LocationRepository.create(
        { survivor: id, ...location },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return res.status(201).json({ id });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppError('Internal server error.', 500);
    } finally {
      await queryRunner.release();
    }
  }
}

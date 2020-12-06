import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { FlagRepository } from '../repositories/FlagRepository';
import SurvivorEntity from '../models/Survivor';
import { Request, Response } from 'express';
import AppError from '@src/utils/AppError';
import { getConnection } from 'typeorm';
import logger from '@src/logger';

interface UserDTO {
  sender: SurvivorEntity;
  target: SurvivorEntity;
}

export default class FlagController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      await FlagRepository.create(req.user as UserDTO, queryRunner);

      let target = req.user.target as SurvivorEntity;

      const amountFlagsTarget = await FlagRepository.countFlags(target);

      if (amountFlagsTarget >= 5) {
        target = await SurvivorRepository.infect(target, queryRunner);
      }

      await queryRunner.commitTransaction();

      return res.status(201).send({ ...target });
    } catch (error) {
      logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new AppError('Internal server error.', 500);
    } finally {
      await queryRunner.release();
    }
  }
}

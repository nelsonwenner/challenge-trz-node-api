import { ResourceRepository } from '../repositories/ResourceRepository';
import { SurvivorRepository } from '../repositories/SurvivorRepository';
import { Request, Response } from 'express';

export default class ReportController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const notInfecteds = await SurvivorRepository.infectedOrNotInfected(false);
    const isInfecteds = await SurvivorRepository.infectedOrNotInfected(true);
    const survivorAll = await SurvivorRepository.getAll();
    const amountLost = await ResourceRepository.sum(true);
    const sumItems = await ResourceRepository.sum(false);

    const payload = [
      {
        description: 'Percentage of infected survivors',
        percentage: {
          values: (100 / survivorAll.length) * isInfecteds,
        },
      },
      {
        description: 'Percentage of not infected survivors',
        percentage: {
          values: (100 / survivorAll.length) * notInfecteds,
        },
      },
      {
        description: 'Average amount of each resource type per survivor',
        FijiWater: {
          average: {
            values: sumItems['Fiji Water'] / notInfecteds,
          },
        },
        CampbellSoup: {
          average: {
            values: sumItems['Campbell Soup'] / notInfecteds,
          },
        },
        FirstAidPouch: {
          average: {
            values: sumItems['First Aid Pouch'] / notInfecteds,
          },
        },
        AK47: {
          average: {
            values: sumItems['AK47'] / notInfecteds,
          },
        },
      },
      {
        description: 'Points lost because of infected survivor.',
        points: {
          values:
            amountLost['Fiji Water'] * 14 +
            amountLost['Campbell Soup'] * 12 +
            amountLost['First Aid Pouch'] * 10 +
            amountLost['AK47'] * 8,
        },
      },
    ];

    return res.status(200).json(payload);
  }
}

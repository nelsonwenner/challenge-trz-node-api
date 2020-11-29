import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const schema = Yup.object({
    latitude: Yup.number().max(180).min(-180).required(),
    longitude: Yup.number().max(180).min(-180).required(),
  }).required();

  await schema.validate(req.body, { abortEarly: false });

  return next();
};

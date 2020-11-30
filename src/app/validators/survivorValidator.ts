import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object({
    name: Yup.string().required(),
    age: Yup.number().integer().positive().required(),
    sex: Yup.string().required(),
    inventory: Yup.array(
      Yup.object({
        itemId: Yup.string().required(),
        quantity: Yup.number().integer().required(),
      }).required()
    ).required(),
    location: Yup.object({
      latitude: Yup.number().max(180).min(-180).required(),
      longitude: Yup.number().max(180).min(-180).required(),
    }).required(),
  }).required();

  await schema.validate(req.body, { abortEarly: false });

  return next();
};

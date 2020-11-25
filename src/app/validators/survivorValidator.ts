import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const schema = Yup.object()
      .shape({
        name: Yup.string().required(),
        age: Yup.number().integer().positive().required(),
        sex: Yup.string().required(),
        inventory: Yup.array()
          .of(
            Yup.object()
              .shape({
                item: Yup.number().integer().positive().required(),
                quantity: Yup.number().integer().required(),
              })
              .required()
          )
          .required(),
        location: Yup.object()
          .shape({
            latitude: Yup.number().max(180).min(-180).required(),
            longitude: Yup.number().max(180).min(-180).required(),
          })
          .required(),
      })
      .required();

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    switch (error.message) {
      default:
        return res.status(400).json({ code: 400, error: error.errors });
    }
  }
};

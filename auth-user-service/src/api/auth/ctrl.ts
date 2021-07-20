import Joi from "joi";
import { Request, Response } from "express";

export const googleSignIn = async (req: Request, res: Response) => {
  res.status(req.statusCode as number).send({
    msg: "done",
  });
};

export const register = async (req: Request, res: Response) => {
  const schema = Joi.object({
    idToken: Joi.string().required(),
    phoneNumber: Joi.string()
      .regex(/^\d{3}\d{3,4}\d{4}$/)
      .required(),
    isBuyer: Joi.boolean().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    delete result.error._original;
    return res.status(400).send(result.error.details);
  }

  const { idToken, phoneNumber, isBuyer } = req.body;

  // TODO: Store user data to DB

  try {
    res.status(200).send({
      idToken,
      phoneNumber,
      isBuyer,
    });
  } catch (err) {
    res.status(500).send(Error("Internal Server Error: Please contact to admin"));
  }
};

import Joi from "joi";
import passport from "passport";
import passportCustomStrategy, { VerifiedCallback } from "passport-custom";
import { verifyGoogleUser } from "./googleOAuth";
import { Request } from "express";

const CustomStrategy = passportCustomStrategy.Strategy;

passport.use(
  "GoogleAuth",
  new CustomStrategy((req: Request, done: VerifiedCallback) => {
    const schema = Joi.object({
      idToken: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      delete result.error._original;
      return done(result.error.details, false);
    }

    verifyGoogleUser(req.body.idToken)
      .then((userId) => {
        if (userId) {
          done(null, userId);
        } else {
          done(new Error("Error: Google OAuth userId is not defined"), false);
        }
      })
      .catch((err) => {
        done(err, false);
      });
  }),
);

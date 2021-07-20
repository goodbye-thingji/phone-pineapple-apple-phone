import express from "express";
import passport from "passport";

import * as ctrl from "./ctrl";

const auth = express.Router();

auth.post("/register", ctrl.register);
auth.post("/login", passport.authenticate("GoogleAuth"), ctrl.googleSignIn);

export default auth;

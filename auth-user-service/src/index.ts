import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import initOracleSessionStore from "express-oracle-session-ts";

import dbConfig from "./config/dbConfig";
import { initPool, initTables } from "./model";
import "./lib/passportInit";
import api from "./api";

dotenv.config();

const { NODE_ENV, PORT, SESSION_SECRET } = process.env;

const app = express();
const OracleSessionStore = initOracleSessionStore(session);

if (!NODE_ENV) {
  throw Error("Error: NODE_ENV does not exist");
}

if (NODE_ENV === "production") {
  app.use(logger("short"));
} else if (NODE_ENV === "development") {
  app.use(logger("dev"));
} else {
  throw Error("Error: Invalid NODE_ENV");
}

if (!SESSION_SECRET) {
  throw Error("Error: SESSION_SECRET does not exist");
}

const sessionStore = new OracleSessionStore(dbConfig);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: "SESSION_KEY",
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: sessionStore,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", api);

app.listen(PORT || 8081, async () => {
  try {
    await initPool();
    await initTables();
    if (NODE_ENV === "development") {
      console.log(`Server listening on port ${PORT}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
});

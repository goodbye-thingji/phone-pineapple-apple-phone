import dotenv from "dotenv";

dotenv.config();

const { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECTION_STRING } = process.env;

if (!ORACLE_USER || !ORACLE_PASSWORD || !ORACLE_CONNECTION_STRING) {
  throw Error("Error: No credentials for Oracle DB connection");
}

export default {
  user: ORACLE_USER,
  password: ORACLE_PASSWORD,
  connectString: ORACLE_CONNECTION_STRING,
};

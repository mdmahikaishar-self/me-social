import { Sequelize } from "sequelize";
import config from "../config";

const db = new Sequelize(
  config.DATABASE_NAME,
  config.DATSBASE_USER,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export default db;

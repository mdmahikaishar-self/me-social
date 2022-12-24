import { Model, DataTypes } from "sequelize";
import db from "../libs/db";
import { TUser } from "../schemas/user.schema";
import { Follow } from ".";

export default class User extends Model<TUser> {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: { type: DataTypes.STRING(25), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(1000), allowNull: false },

    img: { type: DataTypes.STRING(50), allowNull: true, defaultValue: "" },
    cover: { type: DataTypes.STRING(50), allowNull: true, defaultValue: "" },
    city: { type: DataTypes.STRING(25), allowNull: true, defaultValue: "" },
    website: { type: DataTypes.STRING(50), allowNull: true, defaultValue: "" },
  },
  { sequelize: db, modelName: "user" }
);

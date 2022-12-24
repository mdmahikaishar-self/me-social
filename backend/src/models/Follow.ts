import { Model, DataTypes } from "sequelize";
import db from "../libs/db";
import { TFollowModel } from "../schemas/follow.schema";
import User from "./User";

export default class Follow extends Model<TFollowModel> {}

Follow.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  { sequelize: db, modelName: "follow" }
);

Follow.belongsTo(User, {
  foreignKey: { name: "followerUserId" },
  as: "followerUser",
});
Follow.belongsTo(User, {
  foreignKey: { name: "followedUserId" },
  as: "followedUser",
});

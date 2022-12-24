import { Model, DataTypes } from "sequelize";
import db from "../libs/db";
import { User } from ".";
import { TStoryModel } from "../schemas/story.schema";

export default class Story extends Model<TStoryModel> {}

Story.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    img: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "story" }
);

// relation
Story.belongsTo(User, { foreignKey: { name: "userId" } });

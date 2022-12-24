import { Model, DataTypes } from "sequelize";
import db from "../libs/db";
import { User } from ".";
import { TPostModel } from "../schemas/post.schema";

export default class Post extends Model<TPostModel> {}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    text: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
  },
  { sequelize: db, modelName: "post" }
);

// relation
Post.belongsTo(User, { foreignKey: { name: "userId" } });

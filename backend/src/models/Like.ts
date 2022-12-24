import { Model, DataTypes } from "sequelize";
import db from "../libs/db";
import { Post, User } from ".";
import { TLikeModel } from "../schemas/like.schema";

export default class Like extends Model<TLikeModel> {
  static findMany(arg0: { where: { postId: string } }) {
    throw new Error("Method not implemented.");
  }
}

Like.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  { sequelize: db, modelName: "like" }
);

Like.belongsTo(User, { foreignKey: { name: "userId" } });
Like.belongsTo(Post, { foreignKey: { name: "postId" } });
Post.hasMany(Like);

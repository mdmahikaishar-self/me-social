import { Model, DataTypes } from "sequelize";
import db from "../libs/db";
import { Post, User } from ".";
import { TCommentModel } from "../schemas/comment.schema";

export default class Comment extends Model<TCommentModel> {}

Comment.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    text: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "comment" }
);

Comment.belongsTo(User, { foreignKey: { name: "userId" } });
Comment.belongsTo(Post, { foreignKey: { name: "postId" } });
Post.hasMany(Comment);

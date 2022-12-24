import { login, logout, signup, authUser } from "./auth";
import { createComment, deleteComment, getAllComments } from "./comment";
import { createFollow, deleteFollow, isFollowing } from "./follow";
import { createLike, deleteLike, getAllLikes } from "./like";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllUserPosts,
  getPost,
  uploadImg,
} from "./post";
import { createStory, deleteStory, getAllStories, getStory } from "./story";
import { getUser, getUserLong, updateUser } from "./user";

export default {
  // auth
  login,
  signup,
  logout,
  authUser,

  // post
  uploadImg,
  createPost,
  deletePost,
  getAllPosts,
  getAllUserPosts,
  getPost,

  // like
  createLike,
  deleteLike,
  getAllLikes,

  // comment
  createComment,
  deleteComment,
  getAllComments,

  // story
  createStory,
  deleteStory,
  getAllStories,
  getStory,

  // user
  getUser,
  getUserLong,
  updateUser,

  // follow
  createFollow,
  deleteFollow,
  isFollowing,
};

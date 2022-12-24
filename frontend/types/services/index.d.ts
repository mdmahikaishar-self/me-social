import { IPost, ILike, IComment, IStory, IUser, IUserLong } from "..";

//
// Auth
//
// REQUEST
export interface ILoginBody {
  email: string;
  password: string;
}
export interface ISignupBody {
  name: string;
  email: string;
  password: string;
}

// REPLY
export interface IAuthReply {
  accessToken: string;
}
export interface IAuthUserReply {
  user: IUser;
}

//
// Post
//
// REQUEST
export interface ICreatePostBody {
  text: string;
  img: string;
}

// REPLY
export interface ICreatePostReply {
  message: string;
}
export interface IDeletePostReply {
  message: string;
}
export interface IGetAllPostsReply {
  posts: IPost[];
}
export interface IGetPostReply {
  post: IPost;
}

//
// Like
//
// REQUEST

// REPLY
export interface ICreateLikeReply {
  message: string;
}
export interface IDeleteLikeReply {
  message: string;
}
export interface IGetAllLikesReply {
  likes: ILike[];
}

//
// Comment
//
// REQUEST
export interface ICreateCommentBody {
  text: string;
}

// REPLY
export interface ICreateCommentReply {
  message: string;
}
export interface IDeleteCommentReply {
  message: string;
}
export interface IGetAllCommentsReply {
  comments: IComment[];
}

//
// Story
//
// REQUEST
export interface ICreateStoryBody {
  img: string;
}

// REPLY
export interface ICreateStoryReply {
  message: string;
}
export interface IDeleteStoryReply {
  message: string;
}
export interface IGetStoryReply {
  storie: IStory;
}
export interface IGetAllStoriesReply {
  stories: IStory[];
}

//
// User
//
// REQUEST
export interface IUpdateUserBody {
  name: string;
  img: string;
  cover: string;
  website: string;
  city: string;
}

// REPLY
export interface IGetUserReply {
  user: IUser;
}
export interface IGetUserLongReply {
  user: IUserLong;
}
export interface IUpdateUserReply {
  message: string;
}

//
// Follow
//
// REQUEST

// REPLY
export interface ICreateFollowReply {
  message: string;
}
export interface IDeleteFollowReply {
  deleted: boolean;
}
export interface IIsFollowingReply {
  following: boolean;
}

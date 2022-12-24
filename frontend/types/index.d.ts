export interface IUser {
  id: string;
  name: string;
  img: string;
}

export interface IUserLong {
  id: string;
  name: string;
  email: string;
  img: string;
  cover: string;
  website: string;
  city: string;
  createdAt: string;
}

interface ILike {
  id: string;
  userId: string;
}

interface IComment {
  id: string;
  text: string;
  createdAt: string;
  user: IUser;
}

export interface IPost {
  id: string;
  text: string;
  img: string;
  createdAt: string;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
}

export interface IStory {
  id: string;
  img: string;
  createdAt: string;
  user: IUser;
}

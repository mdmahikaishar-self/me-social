export interface IComment {
  id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILike {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFollow {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IStory {
  id: string;
  img: string;
  createdAt?: string;
  updatedAt?: string;
}

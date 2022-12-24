import { IPost, IUserLong } from "@Types/";

export interface IProfileCore {
  user: IUserLong;
  following: boolean;
  posts: IPost[];
}

export interface IProfileContext extends IProfileCore {
  showEditModal: boolean;
  setUser: (value: IUserLong) => void;
  setFollowing: (value: boolean) => void;
  setPosts: (value: IPost[]) => void;
  removePost: (postId: string) => void;
  setShowEditModal: (value: boolean) => void;
}

export interface IProfileContextProvider extends IProfileCore {
  children: ReactNode;
}

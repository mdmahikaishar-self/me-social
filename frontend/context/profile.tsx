"use client";
import { createContext, useContext, useState } from "react";
import {
  IProfileContext,
  IProfileContextProvider,
} from "@Types/context/profile";

const ProfileContext = createContext({} as IProfileContext);

export function ProfileContextProvider({
  children,
  ...rest
}: IProfileContextProvider) {
  const [user, setUser] = useState(rest.user);
  const [following, setFollowing] = useState(rest.following);
  const [posts, setPosts] = useState(rest.posts);
  const [showEditModal, setShowEditModal] = useState(false);

  const removePost = (postId: string) =>
    setPosts((pre) => pre.filter((post) => postId !== post.id));

  return (
    <ProfileContext.Provider
      value={{
        user,
        following,
        posts,
        showEditModal,
        setUser,
        setFollowing,
        setPosts,
        setShowEditModal,
        removePost,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}

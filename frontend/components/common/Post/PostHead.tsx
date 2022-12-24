"use client";
import services from "@services";
import { IUser } from "@Types/";
import { useAuthContext } from "context/Auth";
import jsCookie from "js-cookie";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

interface IPostHead {
  user: IUser;
  postId: string;
  createdAt: string;
  removePost: (postId: string) => void;
}

export default function PostHead({
  user,
  postId,
  createdAt,
  removePost,
}: IPostHead) {
  const ref = useRef({} as HTMLDivElement);
  const authContext = useAuthContext();
  const [showOptions, setShowOptions] = useState(false);

  const handleDeletePost = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.deletePost(postId, token);
      if (response.status !== 200) return;

      // global store
      removePost(postId);
    } catch {
      console.log("failed to remove a post.");
    }
  };

  return (
    <div className="flex items-center gap-4" ref={ref}>
      {/* user img */}
      <Link
        className="flex-none w-10 aspect-square grid rounded-full overflow-hidden"
        href={`/${user.id}`}
      >
        <img src={user.img} alt={user.name} />
      </Link>
      {/* user info */}
      <div className="w-full">
        <Link href={`/${user.id}`}>
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
        </Link>
        <span className="text-sm text-gray-500 ">{createdAt}</span>
      </div>
      {/* option */}
      <div className="flex-none relative">
        <button
          className="w-8 aspect-square grid place-items-center text-gray-500"
          onClick={() => setShowOptions(!showOptions)}
        >
          <FaEllipsisH />
        </button>
        {/* option dropown */}
        {authContext.user?.id === user.id && showOptions && (
          <div className="flex flex-col text-sm absolute top-full right-0 border border-gray-300 rounded-md">
            <button className="w-max px-4 py-2" onClick={handleDeletePost}>
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

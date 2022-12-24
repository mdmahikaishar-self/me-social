"use client";
import services from "@services";
import { IComment, ILike } from "@Types/";
import { useAuthContext } from "context/Auth";
import jsCookie from "js-cookie";
import React, { useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";

interface IReactSection {
  likes: ILike[];
  comments: IComment[];
  postId: string;
  setLikes: (values: any) => void;
  setCommentSection: () => void;
}

export default function ReactSection({
  likes,
  comments,
  postId,
  setLikes,
  setCommentSection,
}: IReactSection) {
  const authContext = useAuthContext();
  const liked = !!likes.find((like) => like.userId === authContext.user?.id);

  const handleCreateLike = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.createLike(postId, token);
      if (response.status !== 200) return;

      // updates likes
      const like = { id: "", userId: authContext.user?.id };
      setLikes((pre: any) => [...pre, like]);
    } catch {
      console.log("failed to like");
    }
  };
  const handleDeleteLike = async () => {
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.deleteLike(postId, token);
      if (response.status !== 200) return;

      // updates likes
      setLikes((pre: ILike[]) =>
        pre.filter((like) => like.userId !== authContext.user?.id)
      );
    } catch {
      console.log("failed to dislike");
    }
  };

  const handleLike = async () => {
    liked ? await handleDeleteLike() : await handleCreateLike();
  };

  return (
    <div className="flex items-center gap-4 text-gray-500">
      {/* LIKE */}
      <button className="flex items-center gap-2" onClick={handleLike}>
        {liked ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="hover:text-red-500" />
        )}
        <span className="text-sm">{likes.length} Likes</span>
      </button>

      {/* Comment */}
      <button className="flex items-center gap-2" onClick={setCommentSection}>
        <FaRegComment />
        <span className="text-sm">{comments.length} Comments</span>
      </button>

      {/* Share */}
      <button className="flex items-center gap-2">
        <FaShare />
        <span className="text-sm">Share</span>
      </button>
    </div>
  );
}

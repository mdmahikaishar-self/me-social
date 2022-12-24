"use client";
import React, { useState } from "react";
import { PostHead, ReactSection } from ".";
import { CommentSection } from "..";
import { IComment, ILike, IPost } from "@Types/";

interface IPostProps {
  post: IPost;
  removePost: (postId: string) => void;
}

export default function Post({ post, removePost }: IPostProps) {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [likes, setLikes] = useState<ILike[]>(post.likes);
  const [comments, setComments] = useState<IComment[]>(post.comments);

  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-md shadow-sm">
      <PostHead
        user={post.user}
        postId={post.id}
        createdAt={post.createdAt}
        removePost={removePost}
      />

      {/* content text */}
      {post.text && <p className="text-sm text-gray-600">{post.text}</p>}

      {/* content img */}
      {post.img && (
        <div className="aspect-video grid rounded-md">
          <img src={post.img} alt={"post image"} />
        </div>
      )}

      <ReactSection
        likes={likes}
        setLikes={setLikes}
        comments={comments}
        postId={post.id}
        setCommentSection={() => setShowCommentSection(!showCommentSection)}
      />

      {showCommentSection && (
        <CommentSection
          comments={comments}
          setComments={setComments}
          postId={post.id}
        />
      )}
    </div>
  );
}

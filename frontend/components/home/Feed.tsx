"use client";
import { useState } from "react";
import { Stories } from "@components/home";
import { CreatePost, Post } from "@components/common";
import { IPost } from "@Types/";

export default function Feed(props: { posts: IPost[] }) {
  const [posts, setPosts] = useState<IPost[]>([...props.posts]);
  const removePost = (postId: string) =>
    setPosts((pre) => pre.filter((post) => postId !== post.id));

  return (
    <div className="col-span-2 px-4 py-4 flex flex-col gap-6">
      <Stories />
      <CreatePost setPosts={setPosts} />

      {posts.map((post) => (
        <Post post={post} removePost={removePost} key={post.id} />
      ))}
    </div>
  );
}

"use client";
import { CreatePost, Post } from "@components/common";
import { ProfileCard } from ".";
import { useProfileContext } from "context/profile";

export default function Feed() {
  const profileContext = useProfileContext();

  return (
    <div className="col-span-2 px-4 py-4 flex flex-col gap-6">
      <ProfileCard />
      <CreatePost setPosts={profileContext.setPosts} />

      {profileContext.posts.map((post) => (
        <Post
          post={post}
          removePost={profileContext.removePost}
          key={post.id}
        />
      ))}
    </div>
  );
}

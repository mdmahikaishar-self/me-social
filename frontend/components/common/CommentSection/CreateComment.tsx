"use client";
import React, { useState } from "react";
import { ICreateCommentBody } from "@Types/services";
import jsCookie from "js-cookie";
import services from "@services";

export default function CreateComment({
  postId,
  setComments,
}: {
  postId: string;
  setComments: (values: any) => void;
}) {
  const [text, setText] = useState("");

  const handleCreateComment = async (body: ICreateCommentBody) => {
    try {
      const token = jsCookie.get("accessToken");
      const response = await services.createComment(body, postId, token);
      if (response.status !== 200) return;

      // clear input
      setText("");

      // get all comments
      const allComments = await services.getAllComments(postId, token);
      if (allComments.status !== 200) return;

      // set comments
      setComments(allComments.data.comments);
    } catch {
      console.log("failed to create a comment.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;

    await handleCreateComment({ text });
  };

  return (
    <form className="mb-4 flex items-center gap-4" onSubmit={handleSubmit}>
      <div className="flex-none w-8 aspect-square grid rounded-full overflow-hidden">
        <img src="/images/01.jpg" alt="" />
      </div>
      <input
        type="text"
        className="w-full h-8 px-2 text-sm  border border-gray-300 bg-transparent outline-none"
        placeholder="Write a comment"
        value={text}
        onChange={(e: any) => setText(e.target.value)}
      />
      <button
        className="flex-none h-8 px-4 text-sm font-semibold bg-blue-500 text-white rounded-sm"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}

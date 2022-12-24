import React from "react";
import { CommentItem, CreateComment } from ".";
import { IComment } from "@Types/";

interface ICommentSection {
  comments: IComment[];
  postId: string;
  setComments: (values: any) => void;
}

export default function CommentSection({
  comments,
  setComments,
  postId,
}: ICommentSection) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <CreateComment setComments={setComments} postId={postId} />

      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

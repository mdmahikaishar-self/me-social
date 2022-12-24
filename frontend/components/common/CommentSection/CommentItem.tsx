import React from "react";
import { IComment } from "@Types/";
import Link from "next/link";

export default function CommentItem({ comment }: { comment: IComment }) {
  return (
    <div className="flex items-start gap-4">
      {/* img */}
      <Link
        className="flex-none w-8 aspect-square grid rounded-full overflow-hidden"
        href={`/${comment.user.id}`}
      >
        <img src={comment.user.img} alt={comment.user.name} />
      </Link>

      {/* info */}
      <div className="w-full text-sm text-gray-600">
        <Link href={`/${comment.user.id}`}>
          <h2 className="font-semibold text-gray-900">{comment.user.name}</h2>
        </Link>
        <p className="">{comment.text}</p>
      </div>
    </div>
  );
}

import request from "./request";
import { AxiosResponse } from "axios";
import {
  ICreateCommentBody,
  ICreateCommentReply,
  IDeleteCommentReply,
  IGetAllCommentsReply,
} from "@Types/services";

/**
 * createComment
 */
export async function createComment(
  body: ICreateCommentBody,
  postId: string,
  token?: string
) {
  return await request.post<
    ICreateCommentBody,
    AxiosResponse<ICreateCommentReply>
  >(`/comment?postId=${postId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * deleteComment
 */
export async function deleteComment(commentId: string, token?: string) {
  return await request.delete<any, AxiosResponse<IDeleteCommentReply>>(
    `/comment?commentId=${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getAllComments
 */
export async function getAllComments(postId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetAllCommentsReply>>(
    `/comment?postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

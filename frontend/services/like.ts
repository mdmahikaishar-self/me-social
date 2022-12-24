import request from "./request";
import { AxiosResponse } from "axios";
import {
  ICreateLikeReply,
  IDeleteLikeReply,
  IGetAllLikesReply,
} from "@Types/services";

/**
 * createLike
 */
export async function createLike(postId: string, token?: string) {
  return await request.post<any, AxiosResponse<ICreateLikeReply>>(
    `/like?postId=${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * deleteLike
 */
export async function deleteLike(postId: string, token?: string) {
  return await request.delete<any, AxiosResponse<IDeleteLikeReply>>(
    `/like?postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getAllLikes
 */
export async function getAllLikes(postId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetAllLikesReply>>(
    `/like?postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

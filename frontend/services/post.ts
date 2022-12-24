import request from "./request";
import { AxiosResponse } from "axios";
import {
  ICreatePostBody,
  ICreatePostReply,
  IDeletePostReply,
  IGetAllPostsReply,
  IGetPostReply,
} from "@Types/services";

/**
 * uploadImg
 */
export async function uploadImg(formData: FormData, token?: string) {
  return await request.post<FormData, AxiosResponse<{ file: string }>>(
    `/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * createPost
 */
export async function createPost(body: ICreatePostBody, token?: string) {
  return await request.post<ICreatePostBody, AxiosResponse<ICreatePostReply>>(
    `/post`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * deletePost
 */
export async function deletePost(postId: string, token?: string) {
  return await request.delete<any, AxiosResponse<IDeletePostReply>>(
    `/post?postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getAllPosts
 */
export async function getAllPosts(token?: string) {
  return await request.get<any, AxiosResponse<IGetAllPostsReply>>(
    `/post/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getAllUserPosts
 */
 export async function getAllUserPosts(userId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetAllPostsReply>>(
    `/post/all?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getPost
 */
export async function getPost(postId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetPostReply>>(
    `/post?postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

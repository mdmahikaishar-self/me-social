import request from "./request";
import { AxiosResponse } from "axios";
import {
  ICreateFollowReply,
  IDeleteFollowReply,
  IIsFollowingReply,
} from "@Types/services";

/**
 * createFollow
 */
export async function createFollow(followedUserId: string, token?: string) {
  return await request.post<any, AxiosResponse<ICreateFollowReply>>(
    `/follow?followedUserId=${followedUserId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * deleteFollow
 */
export async function deleteFollow(followedUserId: string, token?: string) {
  return await request.delete<any, AxiosResponse<IDeleteFollowReply>>(
    `/follow?followedUserId=${followedUserId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * isFollowing
 */
export async function isFollowing(followedUserId: string, token?: string) {
  return await request.get<any, AxiosResponse<IIsFollowingReply>>(
    `/follow/following?followedUserId=${followedUserId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

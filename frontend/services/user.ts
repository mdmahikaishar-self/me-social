import request from "./request";
import { AxiosResponse } from "axios";
import {
  IGetUserLongReply,
  IGetUserReply,
  IUpdateUserBody,
  IUpdateUserReply,
} from "@Types/services";

/**
 * getUser
 */
export async function getUser(userId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetUserReply>>(
    `/user?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getUserLong
 */
export async function getUserLong(userId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetUserLongReply>>(
    `/user/long?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * updateUser
 */
export async function updateUser(body: IUpdateUserBody, token?: string) {
  return await request.put<any, AxiosResponse<IUpdateUserReply>>(
    `/user`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

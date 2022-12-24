import request from "./request";
import { AxiosResponse } from "axios";
import {
  ICreateStoryBody,
  ICreateStoryReply,
  IDeleteStoryReply,
  IGetAllStoriesReply,
  IGetStoryReply,
} from "@Types/services";

/**
 * createStory
 */
export async function createStory(body: ICreateStoryBody, token?: string) {
  return await request.post<ICreateStoryBody, AxiosResponse<ICreateStoryReply>>(
    `/story`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * deleteStory
 */
export async function deleteStory(storyId: string, token?: string) {
  return await request.delete<any, AxiosResponse<IDeleteStoryReply>>(
    `/post?storyId=${storyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getAllStories
 */
export async function getAllStories(token?: string) {
  return await request.get<any, AxiosResponse<IGetAllStoriesReply>>(
    `/story/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * getStory
 */
export async function getStory(storyId: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetStoryReply>>(
    `/story?storyId=${storyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

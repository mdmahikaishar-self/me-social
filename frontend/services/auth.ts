import request from "./request";
import { AxiosResponse } from "axios";
import {
  IAuthReply,
  IAuthUserReply,
  ILoginBody,
  ISignupBody,
} from "@Types/services";

/**
 * Login
 */
export async function login(body: ILoginBody) {
  return await request.post<ILoginBody, AxiosResponse<IAuthReply>>(
    `/auth/login`,
    body
  );
}

/**
 * Signup
 */
export async function signup(body: ISignupBody) {
  return await request.post<ISignupBody, AxiosResponse<IAuthReply>>(
    `/auth/signup`,
    body
  );
}

/**
 * Logout
 */
export async function logout(token?: string) {
  return await request.post(
    `/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

/**
 * Auth User
 */
export async function authUser(token?: string) {
  return await request.get<any, AxiosResponse<IAuthUserReply>>(`/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";
import services from "@services";
import { IAuthContext, IAuthContextProvider } from "./types";
import { IUser } from "@Types/";

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children, auth }: IAuthContextProvider) {
  const router = useRouter();
  const [user, setUser] = useState(auth.user);
  const [status, setStatus] = useState(auth.status);

  // load user (client)
  const loadUser = async () => {
    try {
      const token = jsCookie.get("accessToken");
      // if (!token) return router.push("/auth/login");

      // get current user
      const request = await services.authUser(token);

      if (request.status !== 200) {
        return;
      }

      // authorized user
      const user = request.data.user as unknown as IUser;
      setUser(user);
      setStatus("authorized");
    } catch {
      // return router.push("/auth/login");
      console.log("unauthorized");
    }
  };

  return (
    <AuthContext.Provider value={{ loadUser, user, status }}>
      {children}
    </AuthContext.Provider>
  );
}

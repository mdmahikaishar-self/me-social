"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { redirect, useRouter } from "next/navigation";
import jsCookie from "js-cookie";
import services from "@services";
import { IUser } from "@Types/";
import { IAuthState } from "@Types/context/auth";

const AuthContext = createContext({} as IAuthState);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const authValues = useAuth();

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

function useAuth(): IAuthState {
  const router = useRouter();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const loadUser = async () => {
    try {
      const token = jsCookie.get("accessToken");
      if (!token) return router.push("/auth/login");
      // get current user
      const response = await services.authUser(token);
      if (response.status !== 200) return;
      setUser(response.data.user);
    } catch {
      return router.push("/auth/login");
    }
  };

  // effect
  useEffect(() => {
    user || loadUser();
  }, []);

  return { user, loadUser };
}

export interface IUser {
  id: string;
  name: string;
  img: string;
}

export interface IAuthContext {
  user: IUser | null;
  status: "authorized" | "unauthorized";
  loadUser: () => void;
}

export interface IAuthContextProvider {
  auth: TUseAuthSSRReturn;
  children: ReactNode;
}

export type TUseAuthSSRReturn =
  | {
      user: IUser;
      status: "authorized";
    }
  | { user: null; status: "unauthorized" };

export type TShouldRedirectReturn =
  | {
      should: false;
      path: "/";
    }
  | {
      should: true;
      path: "/auth/login";
    };

import { IUser } from "@Types/";

export interface IAuthState {
  user?: IUser;
  loadUser: () => void;
}

import { LoginParams, User } from "./domain";

export interface UserSlice {
  isAuth: boolean;
  user: User | null;
  setIsAuth: (newIsAuth: boolean) => void,
  setUser: (newUser: User | null) => void,
  login: (loginParam: LoginParams) => Promise<void>,
}

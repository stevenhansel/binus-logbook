import { User } from "./domain";

export interface UserSlice {
  user: User | null;
  setUser: (newUser: User | null) => void,
}

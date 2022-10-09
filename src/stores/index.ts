import create from "zustand"

import createUserSlice from "./user";

import { UserSlice } from "../types/stores";

const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a)
}));

export default useStore;

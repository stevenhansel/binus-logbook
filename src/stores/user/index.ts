import { StateCreator } from "zustand"

import { UserSlice } from '../../types/stores'
import { User } from '../../types/domain'

const createUserSlice: StateCreator<
  UserSlice,
  [],
  [],
  UserSlice
> = (set) => ({
  user: null,
  setUser: (newUser: User | null) => set(() => ({ user: newUser })),
})

export default createUserSlice;

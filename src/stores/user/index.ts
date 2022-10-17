import { StateCreator } from 'zustand'

import doRequest from '../../utils/request'

import { UserSlice } from '../../types/stores'
import { User, LoginParams } from '../../types/domain'

const createUserSlice: StateCreator<
UserSlice,
[],
[],
UserSlice
> = (set) => ({
  isAuth: false,
  user: null,
  setIsAuth: (newIsAuth: boolean) => set(() => ({ isAuth: newIsAuth })),
  setUser: (newUser: User | null) => set(() => ({ user: newUser })),
  login: async (loginParams: LoginParams) => {
    const response = await doRequest({
      url: '/v1/login',
      method: 'POST',
      body: {
        email: loginParams.email,
        password: loginParams.password
      }
    })

    console.log(response)

    set(() => ({ user: response.data }))
  }
})

export default createUserSlice

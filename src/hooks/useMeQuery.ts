import { useEffect, useState } from 'react'

import useStore from '../stores'

import { User } from '../types/domain'
import { HookState } from '../types/hooks'

const useMeQuery = (): HookState<User> => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetched, setIsFetched] = useState(false)

  const user = useStore((state) => state.user)
  // const setUser = useStore((state) => state.setUser)

  const fetchMe = async (): Promise<void> => {
    setError('')
    setIsLoading(true)
    setIsFetched(true)

    // try {
    //   setUser(mockUser)
    // } catch (err) {
    //   setError(String(err))
    // }

    setIsLoading(false)
  }

  useEffect(() => {
    if (!isFetched) {
      fetchMe()
    }
  }, [isFetched])

  return {
    data: user,
    error,
    isLoading,
    refetch: () => setIsFetched(false)
  }
}

export default useMeQuery

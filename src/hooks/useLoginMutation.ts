import { useCallback, useMemo, useState } from 'react'
import useStore from '../stores'

import { LoginParams } from '../types/domain'
import { HookState, UseMutation } from '../types/hooks'

const networkError = 'Network Error'

const useLoginMutation: UseMutation = () => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFired, setIsFired] = useState(false)

  const login = useStore((state) => state.login)

  const triggerMutation = useCallback(async (loginParams: LoginParams) => {
    setError('')
    setIsLoading(true)

    try {
      await login(loginParams)
    } catch (err) {
      console.error(err)
      setError(networkError)
    }

    setIsLoading(false)
    setIsFired(true)
  }, [])

  const hookState: HookState = useMemo(() => ({
    isLoading,
    error,
    isFired,
  }), [isLoading, error, isFired])

  return useMemo(() => [
    triggerMutation,
    hookState
  ], [triggerMutation, hookState])
}

export default useLoginMutation

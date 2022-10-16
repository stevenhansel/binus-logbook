import { useCallback, useMemo, useState } from "react";
import useStore from "../stores";

import { LoginParams } from '../types/domain';
import { HookState, UseMutation } from '../types/hooks';

const useLoginMutation: UseMutation = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useStore((state) => state.login);

  const triggerMutation = useCallback(async (loginParams: LoginParams) => {
    setError('')
    setIsLoading(true)

    try {
      await login(loginParams)
    } catch (err) {
      setError(String(err))
    }

    setIsLoading(false)
  }, []);

  const hookState: HookState = useMemo(() => ({
    isLoading,
    error,
  }), [isLoading, error])

  return useMemo(() => [
    triggerMutation,
    hookState,
  ], [triggerMutation, hookState]);
};

export default useLoginMutation;

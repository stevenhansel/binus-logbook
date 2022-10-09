import { useMemo, useState } from "react";

import { LoginParams } from '../types/domain';
import { HookState, UseMutation } from '../types/hooks';

const useLoginMutation: UseMutation = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const triggerMutation = async (loginParams: LoginParams) => {
    setError('')
    setIsLoading(true)

    try {
    } catch (err) {
      setError(String(err))
    }

    setIsLoading(false)
  };

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

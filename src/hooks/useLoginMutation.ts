import { useState } from "react";

const useLoginMutation = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginParams: LoginParams) => {
    setError('')
    setIsLoading(true)
    setIsFetched(true)

    try {
    } catch (err) {
      setError(String(err))
    }

    setIsLoading(false)
  };

  return [
    login,
    {
      isLoading,
      error,
    },
  ];
};

export default useLoginMutation;

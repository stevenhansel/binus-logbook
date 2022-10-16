export type HookState<R = any> = {
  data?: R,
  isLoading: boolean,
  error: string,
  refetch?: () => {},
}

export type UseMutation<R = any> = () => [(args: any) => Promise<void>, HookState<R>]

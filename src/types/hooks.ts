export interface HookState<R = any> {
  data?: R
  isLoading: boolean
  error: string
  isFired?: boolean
  refetch?: () => void
}

export type UseMutation<R = any> = () => [(args: any) => Promise<void>, HookState<R>]

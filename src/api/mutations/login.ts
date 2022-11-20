import { invoke } from '@tauri-apps/api';
import { Commands } from 'api/tauri';
import { useMutation } from 'react-query';

const login = async (payload: { email: string; password: string }) => await invoke(Commands.Login, payload);

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

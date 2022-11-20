import { useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';

import { Events } from 'api/tauri';

export const useResultListener = (callback: () => void) => {
  useEffect(() => {
    const unlistener = listen(Events.Result, () => callback());

    return () => {
      unlistener.then((fn) => fn());
    };
  }, []);
};

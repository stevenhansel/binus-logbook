import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout(props: Props) {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

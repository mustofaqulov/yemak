import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../configs/queryClient';

export function QueryProvider(props) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}

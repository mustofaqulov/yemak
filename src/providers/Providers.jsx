import { QueryProvider } from './ReactQuery';
import { BrowserRouter } from 'react-router-dom';

export function Providers({ children }) {
  return (
    <QueryProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryProvider>
  );
}

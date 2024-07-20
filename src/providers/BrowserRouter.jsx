import { BrowserRouter } from 'react-router-dom';

export function BrowserRouterProvider({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

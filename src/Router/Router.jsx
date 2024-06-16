import { Route, Routes } from 'react-router-dom';

import { routePaths } from '../constants/routers';

import HomePage from '../pages/HomePage/HomePage';
import Login from '../components/Modals/Login/Login';

export function Router() {
  const { HOME, LOGIN, NOT_FOUND } = routePaths;

  return (
    <Routes>
      <Route path={HOME} element={<HomePage />} />
      <Route path={LOGIN} element={<Login />} />
    </Routes>
  );
}

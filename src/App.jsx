import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';

// import ErrorPage from 'pages/ErrorPage/ErrorPage';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import AuthPage from './pages/AuthPage/AuthPage';
//import ScreenPage from './pages/ScreenPage/ScreenPage';
//import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

//import SharedLayout from './components/SharedLayout/SharedLayout';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import { useDispatch } from 'react-redux';
import { current } from './redux/auth/authOperations';

const test = import.meta.env.VITE_API_TEST;

const AuthPageLazy = lazy(() => import('./pages/AuthPage/AuthPage'));
const HomePageLazy = lazy(() => import('./pages/HomePage/HomePage'));
const ScreenPageLazy = lazy(() => import('./pages/ScreenPage/ScreenPage'));
const SharedLayoutLazy = lazy(() =>
  import('./components/SharedLayout/SharedLayout')
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/auth/:id" element={<AuthPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<SharedLayoutLazy />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

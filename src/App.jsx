import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import RestrictedRoute from './redirect/RestrictedRoute';
import PrivateRoute from './redirect/PrivateRoute';
import { useDispatch } from 'react-redux';
import { current } from './redux/auth/authOperations';
import SharedLayout from './components/SharedLayout/SharedLayout';
import HomePage from './pages/HomePage/HomePage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { useAuth } from './hooks';

function App() {
  const { isLogin } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch, isLogin]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <RestrictedRoute redirectTo="/home">
              <WelcomePage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/auth/:id"
          element={
            <RestrictedRoute redirectTo="/home">
              <AuthPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute redirectTo="/">
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

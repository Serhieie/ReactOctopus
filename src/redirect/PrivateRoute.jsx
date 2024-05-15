import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const { token, isLogin, isLoading } = useAuth();
  const shouldRedirect = !isLoading && !isLogin && !token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

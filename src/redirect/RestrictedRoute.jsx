import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const { token, isLogin } = useAuth();
  const shouldRedirect = isLogin && token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

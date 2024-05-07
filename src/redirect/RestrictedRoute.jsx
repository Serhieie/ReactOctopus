import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const { token, isLogin } = useAuth();
  const shouldRedirect = isLogin && token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default RestrictedRoute;

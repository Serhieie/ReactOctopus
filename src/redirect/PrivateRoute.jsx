import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';

import { selectIsLogin, selectToken } from '../../redux/auth/auth-selectors';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);

  if (!isLogin && token) {
    return <Loader />;
  }

  if (!isLogin && !token) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks';

// const PrivateRoute = ({ children, redirectTo = '/' }) => {
//   const { token, isLoggedIn, isRefreshing } = useAuth();

//   const shouldRedirect = !isRefreshing && !isLoggedIn && !token;

//   return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
// };

// export default PrivateRoute;
// ReactiveOctopus;

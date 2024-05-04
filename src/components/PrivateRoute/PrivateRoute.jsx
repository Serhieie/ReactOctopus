import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { selectIsLogin, selectToken } from '../../redux/auth/authSelectors';
import Loader from '../Loader/Loader';

const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);

  if (!isLogin && token) {
    return <Loader />;
  }
  if (!isLogin && !token) {
    return <Navigate to="/welcome" />;
  }

  return <Outlet />;
};
export default PrivateRoute;

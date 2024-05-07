import { useSelector } from 'react-redux';
import {
  selectToken,
  selectIsLogin,
  selectIsLoading,
  selectAuthError,
  selectUser,
} from '../redux/auth/authSelectors.js';

export const useAuth = () => {
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);

  return {
    token,
    isLogin,
    isLoading,
    user,
    error,
  };
};

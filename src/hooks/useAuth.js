import { useSelector } from 'react-redux';
import {
  selectToken,
  selectIsLogin,
  selectIsLoading,
  selectAuthError,
  selectUser,
  selectUserTheme,
} from '../redux/auth/authSelectors.js';

export const useAuth = () => {
  const isLogin = useSelector(selectIsLogin);
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);
  const theme = useSelector(selectUserTheme);

  return {
    token,
    isLogin,
    isLoading,
    user,
    error,
    theme,
  };
};

import styles from './UserInfo.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import UserInfoSkeleton from '../../Skelletons/UserInfoSkeleton/UserInfoSkeleton';
import { useAuth } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../redux/auth/authSelectors';
import { setUserPlaceholder } from '../../../helpers/setUserPlaceholder';

export const UserInfo = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const theme = useSelector(selectUserTheme);
  const { isLoading } = useAuth();

  const toggleUserInfoModal = async () => {
    setIsUserInfoOpen((state) => !state);
  };

  return isLoading ? (
    <UserInfoSkeleton />
  ) : (
    <div
      onClick={toggleUserInfoModal}
      className={clsx(styles.userInfo, {
        [styles.userInfoDark]: theme === 'dark',
        [styles.userInfoLight]: theme === 'light',
        [styles.userInfoViolet]: theme === 'violet',
      })}
    >
      <p className={styles.userName}>Ivetta</p>
      <img
        className={styles.userAvatar}
        src={setUserPlaceholder(theme)}
        alt="user avatar"
      />
    </div>
  );
};

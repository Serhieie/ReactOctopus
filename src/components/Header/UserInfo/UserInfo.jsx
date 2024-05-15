import styles from './UserInfo.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import UserInfoSkeleton from '../../Skelletons/UserInfoSkeleton/UserInfoSkeleton';
import { useAuth } from '../../../hooks';
import { setUserPlaceholder } from '../../../helpers';
import UserEditModal from '../../UserEditModal/UserEditModal';

export const UserInfo = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const { isLoading, theme, user, avatarURL } = useAuth();

  const toggleUserInfoModal = async () => {
    setIsUserInfoOpen((state) => !state);
  };

  const closeEditForm = () => {
    setIsUserInfoOpen(false);
  };

  return isLoading ? (
    <UserInfoSkeleton />
  ) : (
    <>
      <div
        onClick={toggleUserInfoModal}
        className={clsx(styles.userInfo, {
          [styles.userInfoDark]: theme === 'dark',
          [styles.userInfoLight]: theme === 'light',
          [styles.userInfoViolet]: theme === 'violet',
        })}
      >
        <p className={styles.userName}>{user.name}</p>
        <img
          className={styles.userAvatar}
          src={avatarURL || setUserPlaceholder(theme)}
          alt="user avatar"
        />
      </div>
      <UserEditModal
        name="Edit profile"
        open={isUserInfoOpen}
        func={closeEditForm}
      />
    </>
  );
};

import styles from './UserInfo.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import avatarDark from '../../../assets/user/userDark.png';

export const UserInfo = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const theme = 'Dark';

  const toggleUserInfoModal = async () => {
    setIsUserInfoOpen((state) => !state);
  };

  return (
    <div
      onClick={toggleUserInfoModal}
      className={clsx(styles.userInfo, {
        [styles.userInfoDark]: theme === 'Dark',
        [styles.userInfoLight]: theme === 'Light',
        [styles.userInfoViolet]: theme === 'Violet',
      })}
    >
      <p className={styles.userName}>Ivetta</p>
      <img className={styles.userAvatar} src={avatarDark} alt="user avatar" />
      {isUserInfoOpen && (
        <img
          style={{ position: 'absolute', top: 54, left: 20 }}
          src={avatarDark}
          alt="user avatar"
        />
      )}
    </div>
  );
};

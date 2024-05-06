import styles from './UserInfoSkeleton.module.scss';
import userDark from '../../../assets/user/userDark.png';
import userLight from '../../../assets/user/userLight.png';
import userViolet from '../../../assets/user/userViolet.png';
import clsx from 'clsx';

export const UserInfoSkeleton = () => {
  const theme = 'dark';

  //   const dispatch = useDispatch();
  //   const { theme } = useAuth();

  return (
    <div
      className={clsx(styles.header, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
        [styles.violet]: theme === 'violet',
      })}
    >
      <div className={styles.name}></div>
      {theme === 'dark' && (
        <img className={styles.userAvatar} src={userDark} alt="user avatar" />
      )}
      {theme === 'light' && (
        <img className={styles.userAvatar} src={userLight} alt="user avatar" />
      )}
      {theme === 'violet' && (
        <img className={styles.userAvatar} src={userViolet} alt="user avatar" />
      )}
    </div>
  );
};

export default UserInfoSkeleton;

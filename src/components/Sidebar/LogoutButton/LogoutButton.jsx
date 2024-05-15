import styles from '../LogoutButton/LogoutButton.module.scss';
import LogoSprite from '../../../assets/sprite.svg';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/auth/authOperations';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import { clearTasks } from '../../../redux/tasks/tasksSlice';

const LogoutButton = () => {
  const { theme } = useAuth();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
    dispatch(clearTasks());
  };
  return (
    <section
      className={clsx(styles.logout, {
        [styles.logoutDark]: theme === 'dark',
        [styles.logoutLight]: theme === 'light',
        [styles.logoutViolet]: theme === 'violet',
      })}
    >
      <button className={styles.button} type="button" onClick={onLogout}>
        <svg className={styles.icon}>
          <use
            xlinkHref={`${LogoSprite}#icon-logOut`}
            className={styles.iconLightning}
          />
        </svg>
        <p className={styles.text}>Log out</p>
      </button>
    </section>
  );
};

export default LogoutButton;

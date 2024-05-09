import styles from './PopUp.module.scss';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../redux/auth/authOperations';
import { useAuth } from '../../../../hooks';

export const PopUp = ({ isThemeOpen }) => {
  const { theme } = useAuth();
  const dispatch = useDispatch();

  const handleChangeTheme = async (event) => {
    const theme = event.target.textContent.toLowerCase();
    dispatch(updateUser({ theme: theme }));
  };

  return (
    <div
      className={clsx(styles.themePopUp, {
        [styles.themePopUpDark]: theme === 'dark',
        [styles.themePopUpLight]: theme === 'light',
        [styles.themePopUpViolet]: theme === 'violet',
        [styles.disappear]: !isThemeOpen,
      })}
    >
      <span
        className={theme === 'dark' ? styles.activeDark : ''}
        onClick={handleChangeTheme}
      >
        Dark
      </span>
      <span
        className={theme === 'light' ? styles.activeLight : ''}
        onClick={handleChangeTheme}
      >
        Light
      </span>
      <span
        className={theme === 'violet' ? styles.activeViolet : ''}
        onClick={handleChangeTheme}
      >
        Violet
      </span>
    </div>
  );
};

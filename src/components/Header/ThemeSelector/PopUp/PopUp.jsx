import styles from './PopUp.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const PopUp = ({ isThemeOpen }) => {
  const [theme, setTheme] = useState('Dark');

  const handleChangeTheme = async (event) => {
    const theme = event.target.textContent;
    setTheme(theme);
  };

  return (
    <div
      className={clsx(styles.themePopUp, {
        [styles.themePopUpDark]: theme === 'Dark',
        [styles.themePopUpLight]: theme === 'Light',
        [styles.themePopUpViolet]: theme === 'Violet',
        [styles.disappear]: !isThemeOpen,
      })}
    >
      <span
        className={theme === 'Dark' ? styles.activeDark : ''}
        onClick={handleChangeTheme}
      >
        Dark
      </span>
      <span
        className={theme === 'Light' ? styles.activeLight : ''}
        onClick={handleChangeTheme}
      >
        Light
      </span>
      <span
        className={theme === 'Violet' ? styles.activeViolet : ''}
        onClick={handleChangeTheme}
      >
        Violet
      </span>
    </div>
  );
};

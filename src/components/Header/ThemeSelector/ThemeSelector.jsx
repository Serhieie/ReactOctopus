import styles from './ThemeSelector.module.scss';
import { useState } from 'react';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { PopUp } from './PopUp/PopUp';

export const ThemeSelector = () => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const theme = 'Dark';

  const toggleOpenTheme = async () => {
    setIsThemeOpen((state) => !state);
  };

  return (
    <div onClick={toggleOpenTheme} className={clsx(styles.openTheme)}>
      <span
        className={clsx(styles.openThemeSpan, {
          [styles.openThemeSpanDark]: theme === 'Dark',
          [styles.openThemeSpanLight]: theme === 'Light',
          [styles.openThemeSpanViolet]: theme === 'Violet',
        })}
      >
        Theme{' '}
        <svg
          className={clsx(styles.arrowIcon, {
            [styles.rotate]: isThemeOpen,
          })}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
        >
          <use xlinkHref={`${sprite}#icon-chevron-down`} />
        </svg>
      </span>
      <PopUp isThemeOpen={isThemeOpen} />
    </div>
  );
};
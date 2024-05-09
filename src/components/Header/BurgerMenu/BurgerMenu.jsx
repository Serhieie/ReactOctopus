import styles from './BurgerMenu.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';

export const BurgerMenu = () => {
  const { theme } = useAuth();
  const toggleOpenSidebar = async () => {
    console.log('You are trying to open sidebar');
  };

  return (
    <button
      className={clsx(styles.burgerButton, {
        [styles.burgerButtonDark]: theme === 'dark',
        [styles.burgerButtonLight]: theme === 'light',
        [styles.burgerButtonViolet]: theme === 'violet',
      })}
      onClick={toggleOpenSidebar}
      type="button"
    >
      <svg className={styles.burgerIcon} xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`${sprite}#icon-menu`} />
      </svg>
    </button>
  );
};

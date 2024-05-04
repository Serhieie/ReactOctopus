import styles from './Header.module.scss';
import { useMedia } from '../../hooks/useMedia.js';
import { ThemeSelector } from './ThemeSelector/ThemeSelector.jsx';
import { BurgerMenu } from './BurgerMenu/BurgerMenu.jsx';
import { UserInfo } from './UserInfo/UserInfo.jsx';
import clsx from 'clsx';

export const Header = () => {
  const theme = 'Dark';
  const { isDesktop } = useMedia();
  //   const dispatch = useDispatch();
  //   const { theme } = useAuth();

  return (
    <header
      className={clsx(styles.header, {
        [styles.dark]: theme === 'Dark',
        [styles.light]: theme === 'Light',
        [styles.violet]: theme === 'Violet',
      })}
    >
      {!isDesktop && <BurgerMenu />}
      <ThemeSelector />
      <UserInfo />
    </header>
  );
};

export default Header
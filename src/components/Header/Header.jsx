import styles from './Header.module.scss';
import { useMedia } from '../../hooks/useMedia.js';
import { ThemeSelector } from './ThemeSelector/ThemeSelector.jsx';
import { BurgerMenu } from './BurgerMenu/BurgerMenu.jsx';
import { UserInfo } from './UserInfo/UserInfo.jsx';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const Header = () => {
  const theme = 'Dark';
  const { isDesktop } = useMedia();
  const location = useLocation();
  const endOfURL = location.pathname === '/home';

  //   const dispatch = useDispatch();

  return (
    <>
      {endOfURL && (
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
      )}
    </>
  );
};

export default Header;

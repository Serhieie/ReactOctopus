import styles from './Header.module.scss';
import { useMedia } from '../../hooks/useMedia.js';
import { ThemeSelector } from './ThemeSelector/ThemeSelector.jsx';
import { BurgerMenu } from './BurgerMenu/BurgerMenu.jsx';
import { UserInfo } from './UserInfo/UserInfo.jsx';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../redux/auth/authSelectors.js';

export const Header = () => {
  const theme = useSelector(selectUserTheme);
  const { isDesktop } = useMedia();
  const location = useLocation();
  const endOfURL = location.pathname === '/home';

  //   const dispatch = useDispatch();

  return (
    <>
      {endOfURL && (
        <header
          className={clsx(styles.header, {
            [styles.dark]: theme === 'dark',
            [styles.light]: theme === 'light',
            [styles.violet]: theme === 'violet',
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

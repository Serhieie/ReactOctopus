import styles from './Header.module.scss';
import { useMedia } from '../../hooks/useMedia.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ThemeSelector } from './ThemeSelector/ThemeSelector.jsx';
import { BurgerMenu } from './BurgerMenu/BurgerMenu.jsx';
import { UserInfo } from './UserInfo/UserInfo.jsx';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import HeaderSkelleton from '../Skelletons/UserInfoSkeleton/UserInfoSkeleton.jsx';

export const Header = () => {
  const theme = 'Dark';
  const { isDesktop } = useMedia();
  const location = useLocation();
  const endOfURL = location.pathname === '/home';

  //   const dispatch = useDispatch();
  const { isLoading } = useAuth();

  return isLoading ? (
    <HeaderSkelleton />
  ) : (
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

import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import NeedHelp from './NeedHelp/NeedHelp';
import { useMedia } from '../../hooks';
import clsx from 'clsx';
import LogoutButton from './LogoutButton/LogoutButton';

import styles from './Sidebar.module.scss';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../redux/auth/authSelectors';

const Sidebar = () => {
  const theme = useSelector(selectUserTheme);
  const isSidebarOpen = false;
  const { isMobile, isTablet } = useMedia();
  const location = useLocation();
  const endOfURL = location.pathname === '/home';

  return (
    <>
      {endOfURL && (
        <div
          className={clsx(styles.sidebar_container, {
            [styles.sidebar_containerDark]: theme === 'dark',
            [styles.sidebar_containerLight]: theme === 'light',
            [styles.sidebar_containerViolet]: theme === 'violet',
            [styles.sidebar_hidden]: isMobile || isTablet,
            [styles.sidebar_open]: isSidebarOpen,
          })}
        >
          <Logo theme={theme} />
          <BoardList theme={theme} />
          <NeedHelp theme={theme} />
          <LogoutButton />
        </div>
      )}
    </>
  );
};

export default Sidebar;

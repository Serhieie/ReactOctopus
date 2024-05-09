import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import NeedHelp from './NeedHelp/NeedHelp';
import { useAuth, useMedia } from '../../hooks';
import clsx from 'clsx';
import LogoutButton from './LogoutButton/LogoutButton';
import styles from './Sidebar.module.scss';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { theme } = useAuth();
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
          <LogoutButton theme={theme} />
        </div>
      )}
    </>
  );
};

export default Sidebar;

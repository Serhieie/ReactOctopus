import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import NeedHelp from './NeedHelp/NeedHelp';
import { useMedia } from '../../hooks';
import clsx from 'clsx';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const theme = 'dark';
  const isSidebarOpen = true;
  const { isMobile, isTablet } = useMedia();
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
          <NeedHelp />
        </div>
      )}
    </>
  );
};

export default Sidebar;

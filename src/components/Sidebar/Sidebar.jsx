import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import NeedHelp from './NeedHelp/NeedHelp';
import { useAuth, useMedia } from '../../hooks';
import clsx from 'clsx';
import LogoutButton from './LogoutButton/LogoutButton';
import styles from './Sidebar.module.scss';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsSideBarOpen } from '../../redux/popUps/popUpsSelectors';

const Sidebar = () => {
  const { theme } = useAuth();
  const isSidebarOpen = useSelector(selectIsSideBarOpen);
  const { isMobile, isTablet } = useMedia();
  const location = useLocation();
  const endOfURL = location.pathname.includes('/home');

  return (
    <>
      {endOfURL && (
        <div
          data-id="modal-backdrop"
          className={clsx({
            [styles.sidebar_backdrop]:
              (isMobile && isSidebarOpen) || (isTablet && isSidebarOpen),
            [styles.sidebar_backdropDark]: theme === 'dark',
            [styles.sidebar_backdropLight]: theme === 'light',
            [styles.sidebar_backdropViolet]: theme === 'violet',
          })}
        >
          <div
            className={clsx(styles.sidebar_container, {
              [styles.sidebar_containerDark]: theme === 'dark',
              [styles.sidebar_containerLight]: theme === 'light',
              [styles.sidebar_containerViolet]: theme === 'violet',
              [styles.sidebar_hidden]: isMobile || isTablet,
              [styles.sidebar_open]: isSidebarOpen,
            })}
          >
            <Logo />
            <BoardList />
            <NeedHelp />
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

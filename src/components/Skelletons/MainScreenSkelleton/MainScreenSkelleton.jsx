import styles from './MainScreenSkelleton.module.scss';
import clsx from 'clsx';
import { useMedia } from '../../../hooks/useMedia.js';
import data from './boardsSkell.json';
import { ColumnListSkelleton } from './ColumnListSkelleton/ColumnListSkelleton.jsx';
import { AddButtonSkelleton } from './AddButtonSkelleton/AddButtonSkelleton.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import { useSelector } from 'react-redux';
import { selectBoardsState } from '../../../redux/tasks/tasksSelectors.js';

export const MainScreenSkelleton = () => {
  const { active } = useSelector(selectBoardsState);
  const { theme } = useAuth();
  const board = data[0];
  const isSidebarOpen = false;
  const { isDesktop } = useMedia();

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          backgroundImage: `url(${active ? active.background : ''})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className={clsx(styles.mainScreen, {
          [styles.mainScreenDark]: theme === 'dark',
          [styles.mainScreenLight]: theme === 'light',
          [styles.mainScreenViolet]: theme === 'violet',
          [styles.mainScreenSidebarOpen]: isSidebarOpen && !isDesktop,
        })}
      >
        <div className={styles.mainScreenHead}>
          <div className={styles.headTitle}></div>
          <div className={styles.headFilter}></div>
        </div>
        <div className={styles.mainContent}>
          <ColumnListSkelleton data={board} />
          <AddButtonSkelleton column={true} />
        </div>
      </div>
    </div>
  );
};

import styles from './MainScreenSkelleton.module.scss';
import clsx from 'clsx';
import { useMedia } from '../../../hooks/useMedia.js';
import data from './boardsSkell.json';
import { ColumnListSkelleton } from './ColumnListSkelleton/ColumnListSkelleton.jsx';
import { AddButtonSkelleton } from './AddButtonSkelleton/AddButtonSkelleton.jsx';

export const MainScreenSkelleton = () => {
  const theme = 'dark';
  const board = data[0];
  const isSidebarOpen = false;
  const { isDesktop } = useMedia();

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.mainScreen, {
          [styles.mainScreenDark]: theme === 'dark',
          [styles.mainScreenLight]: theme === 'light',
          [styles.mainScreenViolet]: theme === 'violet',
          [styles.mainScreenSidebarOpen]: isSidebarOpen && !isDesktop,
        })}
      >
        <div className={styles.mainScreenHead}></div>
        <div className={styles.mainContent}>
          <ColumnListSkelleton data={board} />
          <AddButtonSkelleton column={true} />
        </div>
      </div>
    </div>
  );
};

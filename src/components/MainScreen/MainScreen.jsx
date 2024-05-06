import styles from './MainScreen.module.scss';
import clsx from 'clsx';
import data from './boards.json';
import { useAuth } from '../../../hooks/useAuth.js';
import { ExplainField } from './ExplainField/ExplainField.jsx';
import { ColumnList } from './ColumnList/ColumnList.jsx';
import { AddButton } from './AddButton/AddButton.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import { MainScreenSkelleton } from '../Skelletons/MainScreenSkelleton/MainScreenSkelleton.jsx';

export const MainScreen = () => {
  const theme = 'Dark';
  const board = data[0];
  const isSidebarOpen = false;
  const { isDesktop } = useMedia();
  const { isLoading } = useAuth();

  const addColumnFunc = () => {
    console.log('Add Column');
  };

  return isLoading ? (
    <MainScreenSkelleton />
  ) : (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.mainScreen, {
          [styles.mainScreenDark]: theme === 'Dark',
          [styles.mainScreenLight]: theme === 'Light',
          [styles.mainScreenViolet]: theme === 'Violet',
          [styles.mainScreenSidebarOpen]: isSidebarOpen && !isDesktop,
        })}
      >
        {data.length > 0 ? (
          <>
            <div className={styles.mainScreenHead}>
              <h2 className={styles.boardTitle}>Project Office</h2>
              <span className={styles.filters}>Filters</span>
            </div>
            <div className={styles.mainContent}>
              <ColumnList data={board} />
              <AddButton column={true} addFunction={addColumnFunc} />
            </div>
          </>
        ) : (
          <ExplainField />
        )}
      </div>
    </div>
  );
};

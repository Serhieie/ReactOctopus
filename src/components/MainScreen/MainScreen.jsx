import styles from './MainScreen.module.scss';
import clsx from 'clsx';
import data from './boards.json';
import { ExplainField } from './ExplainField/ExplainField.jsx';
import { ColumnList } from './ColumnList/ColumnList.jsx';
import { AddButton } from './AddButton/AddButton.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import { useAuth } from '../../hooks/useAuth.js';
import { MainScreenSkelleton } from '../Skelletons/MainScreenSkelleton/MainScreenSkelleton.jsx';

export const MainScreen = () => {
  const { theme } = useAuth();
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
    <div
      style={{
        backgroundImage:
          'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/zozmb4dmjfzeygotfzpg.webp',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className={styles.wrapper}
    >
      <div
        style={{
          backgroundImage:
            'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/zozmb4dmjfzeygotfzpg.webp',
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

import styles from './MainScreen.module.scss';
import clsx from 'clsx';
import { ExplainField } from './ExplainField/ExplainField.jsx';
import { ColumnList } from './ColumnList/ColumnList.jsx';
import { AddButton } from './AddButton/AddButton.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import { useAuth } from '../../hooks/useAuth.js';
import { MainScreenSkelleton } from '../Skelletons/MainScreenSkelleton/MainScreenSkelleton.jsx';
import { selectBoardsState } from '../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';
import ModalPortal from '../popUps/ModalPortal.jsx';
import MdlColumn from '../popUps/Column/Column.jsx';
import { useState } from 'react';

export const MainScreen = () => {
  const { theme, isLoading } = useAuth();
  const { active, isLoading: isBoardLoading } = useSelector(selectBoardsState);
  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const isSidebarOpen = false;
  const { isDesktop } = useMedia();

  const openAddColumnModal = () => {
    setAddCardOpen(true);
  };
  const closeAddColumnModal = () => {
    setAddCardOpen(false);
  };

  return (isBoardLoading && active) || isLoading ? (
    <MainScreenSkelleton />
  ) : (
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
        {active && active.columns ? (
          <>
            <div className={styles.mainScreenHead}>
              <h2 className={styles.boardTitle}>Project Office</h2>
              <span className={styles.filters}>Filters</span>
            </div>
            <div className={styles.mainContent}>
              <ColumnList data={active} />
              <AddButton column={true} addFunction={openAddColumnModal} />
            </div>
            <ModalPortal>
              <MdlColumn
                open={isAddCardOpen}
                onOpen={openAddColumnModal}
                onClose={closeAddColumnModal}
              />
            </ModalPortal>
          </>
        ) : (
          <ExplainField />
        )}
      </div>
    </div>
  );
};

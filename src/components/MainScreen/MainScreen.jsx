import styles from './MainScreen.module.scss';
import sprite from '../../assets/sprite.svg';
import clsx from 'clsx';
import { ExplainField } from './ExplainField/ExplainField.jsx';
import { ColumnList } from './ColumnList/ColumnList.jsx';
import { AddButton } from './AddButton/AddButton.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import { useAuth } from '../../hooks/useAuth.js';
import { MainScreenSkelleton } from '../Skelletons/MainScreenSkelleton/MainScreenSkelleton.jsx';
import { selectBoardsState } from '../../redux/tasks/tasksSelectors.js';

import { useSelector } from 'react-redux';
import { FilterModal } from '../popUps/Filters/FilterModal.jsx';
import { useIsPopUpOpen } from '../../hooks/useIsPopUpOpen.js';
import { useDispatch } from 'react-redux';
import { setIsFiltersOpen } from '../../redux/popUps/popUpsSlice.js';

export const MainScreen = () => {
  const { theme, isLoading } = useAuth();
  let {
    active,
    items,
    isLoading: isBoardLoading,
  } = useSelector(selectBoardsState);
  const { isFiltersModalOpen } = useIsPopUpOpen();
  const dispatch = useDispatch();

  // active = [];
  // items = [];

  const isSidebarOpen = false;
  const { isDesktop } = useMedia();

  const addColumnFunc = () => {
    console.log('Add Column');
  };

  const openFilters = () => {
    dispatch(setIsFiltersOpen(true));
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
              <div className={styles.blur}>
                <h2 className={styles.boardTitle}>{active.title}</h2>
              </div>
              <div onClick={openFilters} className={styles.blur}>
                {' '}
                <span className={styles.filters}>
                  {' '}
                  <svg
                    className={styles.iconFilter}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                  >
                    <use xlinkHref={`${sprite}#icon-filter`} />
                  </svg>
                  Filters
                </span>
              </div>
            </div>
            <div className={styles.mainContent}>
              <ColumnList data={active ? active : items[0]} />
              <AddButton column={true} addFunction={addColumnFunc} />
            </div>
          </>
        ) : (
          <ExplainField />
        )}
      </div>
      {isFiltersModalOpen && <FilterModal />}
    </div>
  );
};

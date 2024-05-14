import styles from './MainScreen.module.scss';
import sprite from '../../assets/sprite.svg';
import clsx from 'clsx';
import { ExplainField } from './ExplainField/ExplainField.jsx';
import { ColumnList } from './ColumnList/ColumnList.jsx';
import { AddButton } from './AddButton/AddButton.jsx';
import { useMedia } from '../../hooks/useMedia.js';
import { useAuth } from '../../hooks/useAuth.js';
import { MainScreenSkelleton } from '../Skelletons/MainScreenSkelleton/MainScreenSkelleton.jsx';
import {
  selectBoardsState,
  selectColumnsState,
} from '../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';
import { FilterModal } from '../popUps/Filters/FilterModal.jsx';
import { useIsPopUpOpen } from '../../hooks/useIsPopUpOpen.js';
import ModalPortal from '../popUps/ModalPortal.jsx';
import MdlColumn from '../popUps/Column/Column.jsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsFiltersOpen } from '../../redux/popUps/popUpsSlice.js';

export const MainScreen = () => {
  const { theme, isLoading } = useAuth();
  const {
    active,
    items,
    isLoading: isBoardLoading,
  } = useSelector(selectBoardsState);
  const dispatch = useDispatch();
  const { isSidebarOpen, isFiltersOpen } = useIsPopUpOpen();
  const [isAddCardOpen, setAddCardOpen] = useState(false);
  const { isLoading: isColumnLoading } = useSelector(selectColumnsState);
  const [truuue, setTruuue] = useState(true);
  const { isDesktop } = useMedia();
  const navigate = useNavigate();
  const location = useLocation();

  const openAddColumnModal = () => {
    setAddCardOpen(true);
  };

  const closeAddColumnModal = () => {
    setAddCardOpen(false);
  };

  const openFilters = () => {
    dispatch(setIsFiltersOpen(true));
  };

  useEffect(() => {
    // if (location.pathname === `/home/${itemId}`) {
    //   return;
    // }

    if (location.pathname === '/home') {
      setTruuue(true);
    }
    if (items.length === 0) {
      navigate('/home');
    } else {
      const firstItem = active ? active : items[0] ? items[0] : null;
      const itemId = firstItem._id;
      const newPath = `/home/${itemId}`;
      if (truuue) navigate(newPath);
      setTruuue(false);
    }
  }, [items, navigate, truuue]);

  const showIfDonwloading = isColumnLoading || isLoading || isBoardLoading;

  return showIfDonwloading && items?.length > 0 ? (
    <MainScreenSkelleton />
  ) : (
    <div className={styles.wrapper}>
      <div
        style={{
          backgroundImage: `url(${
            active ? active.background : items[0] ? items[0]?.background : ''
          })`,
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
        {(active && active?.columns) ||
        (items?.length > 0 && items[0]?.columns) ? (
          <>
            <div className={styles.mainScreenHead}>
              <div className={styles.blur}>
                <h2 className={styles.boardTitle}>
                  {active ? active.title : items[0].title}
                </h2>
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
        {isFiltersOpen && <FilterModal />}
      </div>
    </div>
  );
};

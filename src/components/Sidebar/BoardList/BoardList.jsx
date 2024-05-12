import BoardListItem from '../BoardListItem/BoardListItem';
import CreateBoardButton from '../CreateBoardButton/CreateBoardButton';
import clsx from 'clsx';
import styles from './BoardList.module.scss';
import { useSelector } from 'react-redux';
import { selectBoardsState } from '../../../redux/tasks/tasksSelectors';
import BoardListSkelleton from './BoardListSkelleton/BoardListSkelleton';
import { useAuth } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoardById } from '../../../redux/tasks/boards/boardsOperations';
// import data from '../../MainScreen/boards.json';

const BoardList = () => {
  const {
    items,
    active,
    isLoading: boardsLoading,
  } = useSelector(selectBoardsState);
  const { isLoading, theme } = useAuth();
  const dispatch = useDispatch();
  const { boardName } = useParams();

  useEffect(() => {
    if (
      active &&
      boardName &&
      boardName !== '/home' &&
      boardName !== active._id
    ) {
      dispatch(fetchBoardById(boardName));
    }
  }, [boardName, dispatch]);

  //Це просто переставляє активний елемент на першу позицію
  const sortedItems = items && [...items];
  if (active) {
    const activeIndex = sortedItems.findIndex(
      (item) => item._id === active._id
    );
    if (activeIndex !== -1) {
      const activeItem = sortedItems.splice(activeIndex, 1)[0];
      sortedItems.unshift(activeItem);
    }
  }

  if (!items) <BoardListSkelleton />;
  return (
    <div
      className={clsx(styles.board_list_container, {
        [styles.board_list_containerDark]: theme === 'dark',
        [styles.board_list_containerLight]: theme === 'light',
        [styles.board_list_containerViolet]: theme === 'violet',
      })}
    >
      <div className={styles.board_list_name}>
        <p>My boards</p>
      </div>
      <div className={styles.board_list_create_btn}>
        <CreateBoardButton theme={theme} />
      </div>
      {isLoading || boardsLoading ? (
        <BoardListSkelleton />
      ) : (
        <ul className={styles.board_list_sheet}>
          {items &&
            sortedItems.map((item, index) => (
              <BoardListItem
                key={item._id}
                board={item}
                theme={theme}
                activeItem={index === 0 ? 'active' : ''}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default BoardList;

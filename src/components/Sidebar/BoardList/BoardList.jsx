import BoardListItem from '../BoardListItem/BoardListItem';
import CreateBoardButton from '../CreateBoardButton/CreateBoardButton';
import clsx from 'clsx';
import styles from './BoardList.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectBoardsState } from '../../../redux/tasks/tasksSelectors';
import { fetchBoards } from '../../../redux/tasks/operations/boardsOperations';
import BoardListSkelleton from './BoardListSkelleton/BoardListSkelleton';
import { useAuth } from '../../../hooks';

const BoardList = ({ theme }) => {
  const { items, isLoading: boardsLoading } = useSelector(selectBoardsState);
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

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
        items.result && (
          <ul className={styles.board_list_sheet}>
            {items.result.map((item) => (
              <BoardListItem key={item._id} board={item} theme={theme} />
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default BoardList;

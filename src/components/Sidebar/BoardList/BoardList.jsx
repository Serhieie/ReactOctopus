import BoardListItem from '../BoardListItem/BoardListItem';
import CreateBoardButton from '../CreateBoardButton/CreateBoardButton';
import clsx from 'clsx';
import data from '../../MainScreen/boards.json';
import styles from './BoardList.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBoards } from '../../../redux/api/tasks-api';
import { useSelector } from 'react-redux';
import { selectBoardsState } from '../../../redux/tasks/tasksSelectors';
import { fetchBoards } from '../../../redux/tasks/operations/boardsOperations';

const BoardList = ({ theme }) => {
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { items } = useSelector(selectBoardsState);

  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(fetchBoards());
  };

  useEffect(() => {
    fetchData();
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
      {items.result && (
        <ul className={styles.board_list_sheet}>
          {items.result.map((item, i) => (
            <BoardListItem
              key={item._id}
              board={item}
              theme={theme}
              //зроби просто first-child то я просто тестив
              isFirst={i === 0 ? true : false}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoardList;

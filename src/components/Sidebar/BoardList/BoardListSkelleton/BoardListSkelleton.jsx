import { nanoid } from 'nanoid';
import clsx from 'clsx';
import data from '../../../MainScreen/boards.json';
import styles from './BoardListSkelleton.module.scss';
import BoardListItemSkelleton from '../../BoardListItem/BoardListItemSkelleton/BoardListItemSkelleton';
import { useAuth } from '../../../../hooks';
import { selectBoardsState } from '../../../../redux/tasks/tasksSelectors';
import { useSelector } from 'react-redux';

const BoardListSkelleton = () => {
  const { items } = useSelector(selectBoardsState);
  const { theme } = useAuth();
  let dataToMap = items ? items : data;
  return (
    <ul
      className={clsx(styles.board_list_sheetSkl, {
        [styles.board_list_sheetDarkSkl]: theme === 'dark',
        [styles.board_list_sheetLightSkl]: theme === 'light',
        [styles.board_list_sheetVioletSkl]: theme === 'violet',
      })}
    >
      {dataToMap.map((item) => (
        <BoardListItemSkelleton key={nanoid()} item={item} />
      ))}
    </ul>
  );
};

export default BoardListSkelleton;

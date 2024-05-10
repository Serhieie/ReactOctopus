import { nanoid } from 'nanoid';
import clsx from 'clsx';
import styles from './BoardListSkelleton.module.scss';
import BoardListItemSkelleton from '../../BoardListItem/BoardListItemSkelleton/BoardListItemSkelleton';
import { useAuth } from '../../../../hooks';

const BoardListSkelleton = () => {
  const { theme } = useAuth();
  const dataSkelletons = [1, 2, 3, 4];
  return (
    <ul
      className={clsx(styles.board_list_sheetSkl, {
        [styles.board_list_sheetDarkSkl]: theme === 'dark',
        [styles.board_list_sheetLightSkl]: theme === 'light',
        [styles.board_list_sheetVioletSkl]: theme === 'violet',
      })}
    >
      {dataSkelletons.map((item) => (
        <BoardListItemSkelleton key={nanoid(item)} />
      ))}
    </ul>
  );
};

export default BoardListSkelleton;

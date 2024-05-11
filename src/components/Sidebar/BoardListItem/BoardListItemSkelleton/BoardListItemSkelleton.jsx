import clsx from 'clsx';
import styles from './BoardListItemSkelleton.module.scss';
import { useAuth } from '../../../../hooks';

const BoardListItemSkelleton = ({ item }) => {
  const { theme } = useAuth();
  if (!item) return;
  return (
    <div
      className={clsx(styles.sidebar_board_item, {
        [styles.sidebar_board_itemDark]: theme === 'dark',
        [styles.sidebar_board_itemLight]: theme === 'light',
        [styles.sidebar_board_itemViolet]: theme === 'violet',
      })}
    >
      <div className={styles.box_3}></div>
      <div className={styles.box_container}>
        <div className={styles.box_2}></div>
        <div className={styles.box_1}></div>
      </div>
    </div>
  );
};

export default BoardListItemSkelleton;

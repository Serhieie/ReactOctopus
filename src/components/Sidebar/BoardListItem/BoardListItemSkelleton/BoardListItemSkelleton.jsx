import clsx from 'clsx';
import styles from './BoardListItemSkelleton.module.scss';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../../redux/auth/authSelectors';

const BoardListItemSkelleton = ({ isFirst }) => {
  const theme = useSelector(selectUserTheme);
  return (
    <div
      className={clsx(styles.sidebar_board_item, {
        [styles.sidebar_board_itemDark]: theme === 'dark',
        [styles.sidebar_board_itemLight]: theme === 'light',
        [styles.sidebar_board_itemViolet]: theme === 'violet',
        [styles.isFirst]: !isFirst,
      })}
    >
      {isFirst && <div className={styles.box_3}></div>}
      <div
        className={clsx(styles.box_container, {
          [styles.isFirst]: isFirst,
        })}
      >
        <div className={styles.box_2}></div>
        <div className={styles.box_1}></div>
      </div>
    </div>
  );
};

export default BoardListItemSkelleton;

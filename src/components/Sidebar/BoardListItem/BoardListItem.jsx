import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

import styles from './BoardListItem.module.scss';
import { useAuth } from '../../../hooks';
import BoardListItemSkelleton from './BoardListItemSkelleton/BoardListItemSkelleton';

const BoardListItem = ({ theme }) => {
  const { isLoading } = useAuth();

  return (
    <li
      className={clsx(styles.sidebar_board_item, {
        [styles.sidebar_board_itemDark]: theme === 'dark',
        [styles.sidebar_board_itemLight]: theme === 'light',
        [styles.sidebar_board_itemViolet]: theme === 'violet',
      })}
    >
      {isLoading ? (
        <BoardListItemSkelleton />
      ) : (
        <>
          <div className={styles.sidebar_board_active}></div>
          <div className={styles.sidebar_boart_cont}>
            <button type="button" className={styles.sidebar_board_remove_btn}>
              <svg
                className={styles.sidebar_board_remove_ico}
                width="16"
                height="16"
              >
                <use xlinkHref={`${LogoSprite}#icon-trash`}></use>
              </svg>
            </button>
            <button type="button" className={styles.sidebar_board_edit_btn}>
              <svg
                className={styles.sidebar_board_edit_ico}
                width="16"
                height="16"
              >
                <use xlinkHref={`${LogoSprite}#icon-pencil`}></use>
              </svg>
            </button>
          </div>

          <div className={styles.sidebar_boart_cont}>
            <p className={styles.sidebar_board_title}>BoardListItem</p>
            <svg
              className={styles.sidebar_board_item_ico}
              width="18"
              height="18"
            >
              <use xlinkHref={`${LogoSprite}#icon-project`}></use>
            </svg>
          </div>
        </>
      )}
    </li>
  );
};

export default BoardListItem;

import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import styles from './BoardListItem.module.scss';
import { useAuth } from '../../../hooks';
import BoardListItemSkelleton from './BoardListItemSkelleton/BoardListItemSkelleton';
import { useState } from 'react';
import ModalPortal from '../../popUps/ModalPortal';
import EditBoard from '../../popUps/Board/EditBoard';
import { DeleteModal } from '../../MainScreen/DeleteModal/DeleteModal';

const BoardListItem = ({ theme, isFirst, board }) => {
  const { isLoading } = useAuth();
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);

  const toggleEditBoardModalOpen = () => {
    setIsEditBoardModalOpen((state) => !state);
  };

  const toggleDeleteBoardModalOpen = () => {
    setIsDeleteBoardModalOpen((state) => !state);
  };

  return (
    <li
      className={clsx(styles.sidebar_board_item, {
        [styles.sidebar_board_itemDark]: theme === 'dark',
        [styles.sidebar_board_itemLight]: theme === 'light',
        [styles.sidebar_board_itemViolet]: theme === 'violet',
      })}
    >
      {isLoading ? (
        <BoardListItemSkelleton isFirst={isFirst} />
      ) : (
        <>
          <div className={styles.sidebar_board_active}></div>
          <div className={styles.sidebar_boart_cont}>
            <button
              onClick={toggleDeleteBoardModalOpen}
              type="button"
              className={styles.sidebar_board_remove_btn}
            >
              <svg
                className={styles.sidebar_board_remove_ico}
                width="16"
                height="16"
              >
                <use xlinkHref={`${LogoSprite}#icon-trash`}></use>
              </svg>
            </button>
            <button
              onClick={toggleEditBoardModalOpen}
              type="button"
              className={styles.sidebar_board_edit_btn}
            >
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
            <p className={styles.sidebar_board_title}>{board.title}</p>
            <svg
              className={styles.sidebar_board_item_ico}
              width="18"
              height="18"
            >
              <use xlinkHref={`${LogoSprite}#icon-project`}></use>
            </svg>
          </div>
          <ModalPortal>
            <EditBoard
              name="Edit board"
              open={isEditBoardModalOpen}
              item={board}
              func={toggleEditBoardModalOpen}
            />
          </ModalPortal>
          <ModalPortal>
            <DeleteModal
              func={toggleDeleteBoardModalOpen}
              itemType="board"
              open={isDeleteBoardModalOpen}
              item={board}
            />
          </ModalPortal>
        </>
      )}
    </li>
  );
};

export default BoardListItem;

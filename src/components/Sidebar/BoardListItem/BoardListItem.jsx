import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import styles from './BoardListItem.module.scss';
import { useState } from 'react';
import ModalPortal from '../../popUps/ModalPortal';
import EditBoard from '../../popUps/Board/EditBoard';
import { DeleteModal } from '../../MainScreen/DeleteModal/DeleteModal';
import { NavLink } from 'react-router-dom';

const BoardListItem = ({ theme, board, activeItem }) => {
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);

  const openEditBoardModalOpen = () => {
    setIsEditBoardModalOpen(true);
  };

  const closeEditBoardModalOpen = () => {
    setIsEditBoardModalOpen(false);
  };

  const closeDeleteBoardModalOpen = () => {
    setIsDeleteBoardModalOpen(false);
  };

  const openDeleteBoardModalOpen = () => {
    setIsDeleteBoardModalOpen(true);
  };

  let endPoint;
  if (board) endPoint = board ? `${board?._id}` : '';

  return (
    <NavLink to={`/home/${endPoint}`}>
      <li
        className={clsx(styles.sidebar_board_item, {
          [styles.sidebar_board_itemDark]: theme === 'dark',
          [styles.sidebar_board_itemLight]: theme === 'light',
          [styles.sidebar_board_itemViolet]: theme === 'violet',
          [styles.board_activeItemDark]:
            activeItem === 'active' && theme === 'dark',
          [styles.board_activeItemLight]:
            activeItem === 'active' && theme === 'light',
          [styles.board_activeItemViolet]:
            activeItem === 'active' && theme === 'violet',
        })}
      >
        <div className={styles.right_part}>
          {' '}
          <div className={styles.sidebar_board_active}></div>
          <div className={styles.sidebar_board_cont}>
            <button
              onClick={openDeleteBoardModalOpen}
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
              onClick={openEditBoardModalOpen}
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
        </div>

        <div className={styles.sidebar_board_cont}>
          <p className={styles.sidebar_board_title}>{board.title}</p>
          <svg className={styles.sidebar_board_item_ico} width="18" height="18">
            <use xlinkHref={`${LogoSprite}#icon-${board.iconId}`}></use>
          </svg>
        </div>
        <ModalPortal>
          <EditBoard
            name="Edit board"
            open={isEditBoardModalOpen}
            item={board}
            func={closeEditBoardModalOpen}
          />
        </ModalPortal>
        <ModalPortal>
          <DeleteModal
            func={closeDeleteBoardModalOpen}
            itemType="board"
            open={isDeleteBoardModalOpen}
            item={board}
          />
        </ModalPortal>
      </li>
    </NavLink>
  );
};

export default BoardListItem;

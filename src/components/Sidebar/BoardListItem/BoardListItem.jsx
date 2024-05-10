import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import styles from './BoardListItem.module.scss';
import { useState } from 'react';
import ModalPortal from '../../popUps/ModalPortal';
import EditBoard from '../../popUps/Board/EditBoard';
import { DeleteModal } from '../../MainScreen/DeleteModal/DeleteModal';
import { useDispatch } from 'react-redux';
import { fetchBoardById } from '../../../redux/tasks/operations/boardsOperations';

const BoardListItem = ({ theme, board }) => {
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleEditBoardModalOpen = () => {
    setIsEditBoardModalOpen((state) => !state);
  };

  const toggleDeleteBoardModalOpen = () => {
    setIsDeleteBoardModalOpen((state) => !state);
  };

  const handleChangeBoard = () => {
    // dispatch(fetchBoardById(board._id));
  };

  return (
    <li
      onClick={handleChangeBoard}
      className={clsx(styles.sidebar_board_item, {
        [styles.sidebar_board_itemDark]: theme === 'dark',
        [styles.sidebar_board_itemLight]: theme === 'light',
        [styles.sidebar_board_itemViolet]: theme === 'violet',
      })}
    >
      <div className={styles.right_part}>
        {' '}
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
      </div>

      <div className={styles.sidebar_boart_cont}>
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
    </li>
  );
};

export default BoardListItem;

import styles from './DeleteModal.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { getEntityName } from '../../../helpers/deleteModalHelper';
import { deleteColumn } from '../../../redux/tasks/operations/columnsOperations';
import { deleteCard } from '../../../redux/tasks/operations/cardsOperations';
import { deleteBoard } from '../../../redux/tasks/operations/boardsOperations';
import { useAuth } from '../../../hooks';

export const DeleteModal = ({ open, itemType, item, func }) => {
  const { theme } = useAuth();
  const dispatch = useDispatch();

  const onConfirmDelete = () => {
    switch (itemType) {
      case 'column':
        dispatch(deleteColumn({ boardId: item._id, columnId: item.owner }));
        break;
      case 'card':
        dispatch(
          deleteCard({
            boardId: item.boardId,
            columnId: item.columnId,
            cardId: item._id,
          })
        );
        break;
      case 'board':
        dispatch(deleteBoard(item._id));
        break;
      default:
        break;
    }
  };

  return (
    open && (
      <div
        className={clsx(styles.modalOverlay, {
          [styles.modalOverlayDark]: theme === 'dark',
          [styles.modalOverlayLight]: theme === 'light',
          [styles.modalOverlayViolet]: theme === 'violet',
        })}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Confirmation</h2>
            <button className={styles.closeButton} onClick={func}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <use xlinkHref={`${sprite}#icon-x-close`} />
              </svg>
            </button>
          </div>
          <div className={styles.modalBody}>
            <p>Are you sure you want to delete {getEntityName(itemType)}?</p>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.deleteButton} onClick={onConfirmDelete}>
              Delete
            </button>
            <button className={styles.cancelButton} onClick={func}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

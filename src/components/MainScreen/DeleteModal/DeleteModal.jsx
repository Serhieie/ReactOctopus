import styles from './DeleteModal.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirmDelete,
  theme,
  column,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(styles.modalOverlay, {
        [styles.modalOverlayDark]: theme === 'Dark',
        [styles.modalOverlayLight]: theme === 'Light',
        [styles.modalOverlayViolet]: theme === 'Violet',
      })}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Confirmation</h2>
          <button className={styles.closeButton} onClick={onClose}>
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
          <p>Are you sure you want to delete {column ? 'column' : 'card'}?</p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.deleteButton} onClick={onConfirmDelete}>
            Delete
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

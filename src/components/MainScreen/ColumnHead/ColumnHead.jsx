import styles from './ColumnHead.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { ColumnHeadSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnHeadSkelleton/ColumnHeadSkelleton.jsx';
import { DeleteModal } from '../DeleteModal/DeleteModal.jsx';
import ModalPortal from '../../popUps/ModalPortal.jsx';
import { useState } from 'react';
import { selectColumnsState } from '../../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';
import MdlEdit from '../../popUps/Column/Edit.jsx';

export const ColumnHead = ({ column, isDragging }) => {
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
  const { isLoading: isColumnLoading } = useSelector(selectColumnsState);
  const { theme } = useAuth();

  const openEditColumn = () => {
    setIsEditPopUpOpen(true);
  };
  const closeEditColumn = () => {
    setIsEditPopUpOpen(false);
  };

  const openDeleteCard = () => {
    setIsDeletePopUpOpen(true);
  };
  const closeDeleteCard = () => {
    setIsDeletePopUpOpen(false);
  };

  return isColumnLoading ? (
    <ColumnHeadSkelleton />
  ) : (
    <>
      <div
        className={clsx(styles.columnHead, {
          [styles.columnHeadDark]: theme === 'dark',
          [styles.columnHeadLight]: theme === 'light',
          [styles.columnHeadViolet]: theme === 'violet',
          [styles.columnHeadDraggingDark]: theme === 'dark' && isDragging,
          [styles.columnHeadDraggingLight]: theme === 'light' && isDragging,
          [styles.columnHeadDraggingViolet]: theme === 'violet' && isDragging,
        })}
      >
        {' '}
        <p className={styles.columnTitle}>{column.title}</p>
        <div className={styles.icons}>
          <button
            className={styles.button}
            onClick={openEditColumn}
            type="button"
          >
            <span className={styles.lightSpanBtn}></span>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref={`${sprite}#icon-pencil`} />
            </svg>
          </button>
          <button
            className={styles.button}
            onClick={openDeleteCard}
            type="button"
          >
            <span className={styles.lightSpanBtn}></span>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
        <ModalPortal>
          <DeleteModal
            func={closeDeleteCard}
            open={isDeletePopUpOpen}
            itemType="column"
            item={column}
          />
          <MdlEdit
            open={isEditPopUpOpen}
            onOpen={openEditColumn}
            onClose={closeEditColumn}
            item={column}
          />
        </ModalPortal>
      </div>
    </>
  );
};

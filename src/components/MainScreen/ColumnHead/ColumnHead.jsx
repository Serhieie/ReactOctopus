import { useState } from 'react';
import styles from './ColumnHead.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { DeleteModal } from '../DeleteModal/DeleteModal';

export const ColumnHead = ({ column }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const theme = 'Dark';

  const editColumn = () => {
    console.log('You will edit column');
  };

  const toggleDeleteColumn = () => {
    setIsDeleteModalOpen((state) => !state);
  };

  const confirmDelete = () => {
    console.log('Delete Success');

    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(styles.columnHead, {
          [styles.columnHeadDark]: theme === 'Dark',
          [styles.columnHeadLight]: theme === 'Light',
          [styles.columnHeadViolet]: theme === 'Violet',
        })}
      >
        {' '}
        <p className={styles.columnTitle}>{column.title}</p>
        <div className={styles.icons}>
          <button className={styles.button} onClick={editColumn} type="button">
            <span className={styles.lightSpanBtn}></span>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref={`${sprite}#icon-pencil`} />
            </svg>
          </button>
          <button
            className={styles.button}
            onClick={toggleDeleteColumn}
            type="button"
          >
            <span className={styles.lightSpanBtn}></span>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={toggleDeleteColumn}
        onConfirmDelete={confirmDelete}
        theme={theme}
        column={true}
      />
    </>
  );
};

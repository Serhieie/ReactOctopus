import styles from './ColumnHead.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { ColumnHeadSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnHeadSkelleton/ColumnHeadSkelleton.jsx';
import { DeleteModal } from '../DeleteModal/DeleteModal.jsx';
import ModalPortal from '../../popUps/ModalPortal.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../redux/auth/authSelectors.js';

export const ColumnHead = ({ column }) => {
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const theme = useSelector(selectUserTheme);
  const { isLoading } = useAuth();

  const editColumn = () => {
    console.log('You will edit column');
  };
  const togleDeleteColumn = () => {
    setIsDeletePopUpOpen((state) => !state);
  };

  return isLoading ? (
    <ColumnHeadSkelleton />
  ) : (
    <>
      <div
        className={clsx(styles.columnHead, {
          [styles.columnHeadDark]: theme === 'dark',
          [styles.columnHeadLight]: theme === 'light',
          [styles.columnHeadViolet]: theme === 'violet',
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
            onClick={togleDeleteColumn}
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
            func={togleDeleteColumn}
            open={isDeletePopUpOpen}
            itemType="column"
            item={column}
          />
        </ModalPortal>
      </div>
    </>
  );
};

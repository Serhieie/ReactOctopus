import styles from './Buttons.module.scss';
import sprite from '../../../../assets/sprite.svg';
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import clsx from 'clsx';
import { useState } from 'react';
import { isToday } from '../../../../helpers/isToday';
import { MovePopUp } from '../MovePopUp/MovePopUp';
import ModalPortal from '../../../popUps/ModalPortal';
import { useAuth } from '../../../../hooks';
import AddEditCardForm from '../../../popUps/cardModal/AddEditCardForm';
import { useSelector } from 'react-redux';
import { selectBoardsState } from '../../../../redux/tasks/tasksSelectors';

export const Buttons = ({ card, column }) => {
  const { theme } = useAuth();
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [isEditCardOpen, setIsEditCardOpen] = useState(false);
  const [isMoveCardPopUpOpen, setIsMoveCardPopUpOpen] = useState(false);
  const tooday = isToday(card.deadline);
  const { active } = useSelector(selectBoardsState);

  const columnsAmount = active.columns.length > 1;

  const openEditCard = () => {
    setIsEditCardOpen(true);
  };
  const closeEditCard = () => {
    setIsEditCardOpen(false);
  };

  const openDeleteCard = () => {
    setIsDeleteCardOpen(true);
  };

  const closeDeleteCard = () => {
    setIsDeleteCardOpen(false);
  };

  const moveCardClose = () => {
    setIsMoveCardPopUpOpen(false);
  };
  const moveCardOpen = () => {
    setIsMoveCardPopUpOpen(true);
  };
  return (
    <div
      className={clsx(styles.buttons, {
        [styles.buttonsDark]: theme === 'dark',
        [styles.buttonsLight]: theme === 'light',
        [styles.buttonsViolet]: theme === 'violet',
      })}
    >
      {tooday && (
        <span className={styles.isDeadlineToodaySpan}>
          <span className={styles.lightSpan}></span>
          <svg
            className={styles.isDeadlineTooday}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <use xlinkHref={`${sprite}#icon-bell`} />
          </svg>
        </span>
      )}
      {columnsAmount && (
        <button className={styles.button} type="button" onClick={moveCardOpen}>
          <span className={styles.lightSpanBtn}></span>
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <use xlinkHref={`${sprite}#icon-arrow-circle-right`} />
          </svg>
        </button>
      )}
      <button className={styles.button} type="button" onClick={openEditCard}>
        <span className={styles.lightSpanBtn}></span>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
        >
          <use xlinkHref={`${sprite}#icon-pencil`} />
        </svg>
      </button>
      <button className={styles.button} type="button" onClick={openDeleteCard}>
        <span className={styles.lightSpanBtn}></span>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
        >
          <use xlinkHref={`${sprite}#icon-trash`} />
        </svg>
      </button>
      <MovePopUp
        isMoveCardPopUpOpen={isMoveCardPopUpOpen}
        currentBoard={active}
        false={moveCardClose}
        columnTitle={column.title}
        card={card}
      />
      <ModalPortal>
        {isEditCardOpen && (
          <AddEditCardForm
            cardData={card}
            columnId={column._id}
            func={closeEditCard}
          />
        )}
        <DeleteModal
          open={isDeleteCardOpen}
          itemType="card"
          item={card}
          func={closeDeleteCard}
        />
      </ModalPortal>
    </div>
  );
};

import styles from './Buttons.module.scss';
import sprite from '../../../../assets/sprite.svg';
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import clsx from 'clsx';
import { useState } from 'react';
import { isToday } from '../../../../helpers/isToday';
import { MovePopUp } from '../MovePopUp/MovePopUp';
import data from '../../boards.json';
import ModalPortal from '../../../popUps/ModalPortal';

export const Buttons = ({ card, columnTitle }) => {
  const theme = 'Dark';
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [isMoveCardPopUpOpen, setIsMoveCardPopUpOpen] = useState(false);
  const tooday = isToday(card.deadline);

  //fetchById?
  const currentBoard = data[0];

  const editCard = () => {
    console.log('You will edit card');
  };

  const toggleDeleteCard = () => {
    setIsDeleteCardOpen((state) => !state);
  };

  const moveCard = () => {
    console.log('Move Card');
    setIsMoveCardPopUpOpen((state) => !state);
  };

  return (
    <div
      className={clsx(styles.buttons, {
        [styles.buttonsDark]: theme === 'Dark',
        [styles.buttonsLight]: theme === 'Light',
        [styles.buttonsViolet]: theme === 'Violet',
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
      <button className={styles.button} type="button" onClick={moveCard}>
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
      <button className={styles.button} type="button" onClick={editCard}>
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
      <button
        className={styles.button}
        type="button"
        onClick={toggleDeleteCard}
      >
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
        currentBoard={currentBoard}
        moveCard={moveCard}
        columnTitle={columnTitle}
      />
      <ModalPortal>
        <DeleteModal
          open={isDeleteCardOpen}
          itemType="card"
          item={card}
          func={toggleDeleteCard}
        />
      </ModalPortal>
    </div>
  );
};

import styles from './MovePopUp.module.scss';
import sprite from '../../../../assets/sprite.svg';
import clsx from 'clsx';

export const MovePopUp = ({ isMoveCardPopUpOpen, currentBoard, moveCard }) => {
  const theme = 'Dark';

  const handleChangeColumn = async (event) => {
    const board = event.target.textContent;
    console.log(`You will move your card to ${board} column`);
    moveCard();
  };

  return (
    <div
      className={clsx(styles.movePopUp, {
        [styles.movePopUpDark]: theme === 'Dark',
        [styles.movePopUpLight]: theme === 'Light',
        [styles.movePopUpViolet]: theme === 'Violet',
        [styles.disappear]: !isMoveCardPopUpOpen,
      })}
    >
      {currentBoard.columns.map((column) => (
        <span
          key={column._id}
          className={styles.span}
          onClick={handleChangeColumn}
        >
          {column.title}{' '}
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <use xlinkHref={`${sprite}#icon-arrow-circle-right`} />
          </svg>
        </span>
      ))}
    </div>
  );
};

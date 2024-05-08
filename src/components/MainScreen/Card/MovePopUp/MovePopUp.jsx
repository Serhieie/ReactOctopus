import styles from './MovePopUp.module.scss';
import sprite from '../../../../assets/sprite.svg';
import clsx from 'clsx';

//ЦЕЙ ПОПАП ТРЕБА ВИНЕСТИ ІЗ КАРТКИ У КОЛОНКУ ЩО Б ВІН МІГ ВИХОДИТИ ЗА МЕЖІ КАРТКИ`
export const MovePopUp = ({
  isMoveCardPopUpOpen,
  currentBoard,
  moveCard,
  columnTitle,
}) => {
  const theme = 'Dark';
  const handleChangeColumn = async (event) => {
    const board = event.target.textContent;
    console.log(`You will move your card to ${board} column`);
    moveCard();
  };

  return (
    <div
      className={clsx(styles.modalOverlay, {
        [styles.modalOverlayDark]: theme === 'Dark',
        [styles.modalOverlayLight]: theme === 'Light',
        [styles.modalOverlayViolet]: theme === 'Violet',
        [styles.disappear]: !isMoveCardPopUpOpen,
      })}
    >
      <div className={styles.movePopUp}>
        {currentBoard.columns.map((column) =>
          columnTitle !== column.title ? (
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
          ) : null
        )}
      </div>
    </div>
  );
};

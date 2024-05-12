import styles from './MovePopUp.module.scss';
import sprite from '../../../../assets/sprite.svg';
import clsx from 'clsx';
import { useAuth } from '../../../../hooks';
import { useDispatch } from 'react-redux';
import { moveCardOperation } from '../../../../redux/tasks/cards/cardsOperations';
import useEscapeKeyToClosePopUps from '../../../../hooks/closePopUps';

export const MovePopUp = ({
  isMoveCardPopUpOpen,
  currentBoard,
  func,
  columnTitle,
  card,
}) => {
  const { theme } = useAuth();
  const dispatch = useDispatch();
  console.log(isMoveCardPopUpOpen);
  useEscapeKeyToClosePopUps(func, isMoveCardPopUpOpen);

  const handleChangeColumn = async (event) => {
    const destinationColumnId = event.target.id;
    dispatch(moveCardOperation({ card, destinationColumnId }));
    func(false);
  };

  return (
    <div
      data-id="move-popUp"
      className={clsx(styles.modalOverlay, {
        [styles.modalOverlayDark]: theme === 'dark',
        [styles.modalOverlayLight]: theme === 'light',
        [styles.modalOverlayViolet]: theme === 'violet',
        [styles.disappear]: !isMoveCardPopUpOpen,
      })}
    >
      <div className={styles.movePopUp}>
        {currentBoard.columns.map((column) =>
          columnTitle !== column.title ? (
            <span
              key={column._id}
              id={column._id}
              className={styles.span}
              onClick={handleChangeColumn}
            >
              {column.title}
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

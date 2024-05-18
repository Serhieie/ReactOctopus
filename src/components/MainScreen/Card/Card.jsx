import styles from './Card.module.scss';
import clsx from 'clsx';
import { Buttons } from './Buttons/Buttons';
import { Priority } from './Priority/Priority';
import {
  getColorByPriority,
  getDragingColorByPriority,
} from '../../../helpers';
import { useAuth } from '../../../hooks';
import { CardSkelleton } from '../../Skelletons/MainScreenSkelleton/CardSkelleton/CardSkelleton';
import { Draggable } from 'react-beautiful-dnd';
import { selectCardsState } from '../../../redux/tasks/tasksSelectors';
import { useSelector } from 'react-redux';

export const Card = ({ card, column, index }) => {
  const { theme } = useAuth();
  const { isLoading: isCardLoading } = useSelector(selectCardsState);
  // const { isLoading: isColumnLoading } = useSelector(selectColumnsState);

  const labelColor = getColorByPriority(card.priority, theme);
  const draggingColor = getDragingColorByPriority(theme);

  //TRANSFORM RIGHT AFTER SIDEBAR
  return isCardLoading ? (
    <CardSkelleton />
  ) : (
    <Draggable draggableId={card?._id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // eslint-disable-next-line react/prop-types
          className={clsx(styles.card, {
            [styles.cardDark]: theme === 'dark',
            [styles.cardLight]: theme === 'light',
            [styles.cardViolet]: theme === 'violet',
            [styles.cardDraggingDark]: theme === 'dark' && snapshot.isDragging,
            [styles.cardDraggingLight]:
              theme === 'light' && snapshot.isDragging,
            [styles.cardDraggingViolet]:
              theme === 'violet' && snapshot.isDragging,
          })}
        >
          <span
            className={styles.absoluteSpan}
            style={{
              backgroundColor: snapshot.isDragging
                ? draggingColor
                : `${labelColor}`,
            }}
          ></span>
          <div className={styles.descriptionBlock}>
            <h4 className={styles.cardTitle}>{card?.title}</h4>
            <p className={styles.cardDescription}>{card?.description}</p>
          </div>
          <hr className={styles.hr} />
          <div className={styles.priorityBlock}>
            <Priority
              isDragging={snapshot.isDragging}
              card={card}
              labelColor={labelColor}
            />
            <Buttons
              isDragging={snapshot.isDragging}
              card={card}
              column={column}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

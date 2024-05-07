import styles from './Card.module.scss';
import clsx from 'clsx';
import { Buttons } from './Buttons/Buttons';
import { Priority } from './Priority/Priority';
import { getColorByPriority } from '../../../helpers/getColorByPriority';
import { useAuth } from '../../../hooks';
import { CardSkelleton } from '../../Skelletons/MainScreenSkelleton/CardSkelleton/CardSkelleton';
import { Draggable } from 'react-beautiful-dnd';

export const Card = ({ card, columnTitle, index }) => {
  const theme = 'Dark';
  const { isLoading } = useAuth();
  const labelColor = getColorByPriority(card.priority);
  //TRANSFORM RIGHT AFTER SIDEBAR
  return isLoading ? (
    <CardSkelleton />
  ) : (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={clsx(styles.card, {
            [styles.cardDark]: theme === 'Dark',
            [styles.cardLight]: theme === 'Light',
            [styles.cardViolet]: theme === 'Violet',
          })}
        >
          <span
            className={styles.absoluteSpan}
            style={{ backgroundColor: `${labelColor}` }}
          ></span>
          <div className={styles.descriptionBlock}>
            <h4 className={styles.cardTitle}>{card.title}</h4>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
          <hr className={styles.hr} />
          <div className={styles.priorityBlock}>
            <Priority card={card} labelColor={labelColor} />
            <Buttons card={card} columnTitle={columnTitle} />
          </div>
        </li>
      )}
    </Draggable>
  );
};
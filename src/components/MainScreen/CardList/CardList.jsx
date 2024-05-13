import styles from './CardList.module.scss';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { Card } from '../Card/Card.jsx';
import { Droppable } from 'react-beautiful-dnd';
import { useAuth } from '../../../hooks/useAuth.js';
import { CardListSkelleton } from '../../Skelletons/MainScreenSkelleton/CardListSkelleton/CardListSkelleton.jsx';
import { selectColumnsState } from '../../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';

export const CardList = ({ column }) => {
  const { theme } = useAuth();
  const { isLoading: isCardLoading } = useSelector(selectColumnsState);
  // const sortedData = column.cards.slice().sort(sortByCreatedAt);

  return isCardLoading ? (
    <CardListSkelleton />
  ) : (
    <>
      {' '}
      <Droppable droppableId={column._id}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(styles.cardList, {
              [styles.cardListDark]: theme === 'dark',
              [styles.cardListLight]: theme === 'light',
              [styles.cardListViolet]: theme === 'violet',
            })}
          >
            {column?.cards?.length &&
              column.cards.map((card, index) => (
                <Card
                  key={nanoid()}
                  card={card}
                  column={column}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </>
  );
};

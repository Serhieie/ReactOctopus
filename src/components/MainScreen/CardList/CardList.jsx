import styles from './CardList.module.scss';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { Card } from '../Card/Card.jsx';
import { Droppable } from 'react-beautiful-dnd';
import { useAuth } from '../../../hooks/useAuth.js';
import { sortByCreatedAt } from '../../../helpers/sortByCreatedAt.js';
import { CardListSkelleton } from '../../Skelletons/MainScreenSkelleton/CardListSkelleton/CardListSkelleton.jsx';

export const CardList = ({ column }) => {
  const { theme, isLoading } = useAuth();

  const sortedData = column.cards.slice().sort(sortByCreatedAt);

  return isLoading ? (
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
            {sortedData &&
              sortedData.map((card, index) => (
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

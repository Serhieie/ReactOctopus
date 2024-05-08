import styles from './CardList.module.scss';
import clsx from 'clsx';
import { Card } from '../Card/Card.jsx';
import { Droppable } from 'react-beautiful-dnd';
import { useAuth } from '../../../hooks/useAuth.js';
import { sortByCreatedAt } from '../../../helpers/sortByCreatedAt.js';
import { CardListSkelleton } from '../../Skelletons/MainScreenSkelleton/CardListSkelleton/CardListSkelleton.jsx';

export const CardList = ({ data, columnTitle, columnId }) => {
  const theme = 'Dark';
  const { isLoading } = useAuth();

  // const sortedData = data.map((board) => ({
  //   ...board,
  //   columns: board.columns.map((column) => ({
  //     ...column,
  //     tasks: column.tasks.slice().sort(sortByCreatedAt),
  //   })),
  // }));

  //storted by createdAt Потребує налаштування та перевірки з бекендом
  const sortedData = data.slice().sort(sortByCreatedAt);

  return isLoading ? (
    <CardListSkelleton />
  ) : (
    <>
      {' '}
      <Droppable droppableId={columnId}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(styles.cardList, {
              [styles.cardListDark]: theme === 'Dark',
              [styles.cardListLight]: theme === 'Light',
              [styles.cardListViolet]: theme === 'Violet',
            })}
          >
            {data &&
              sortedData.map((card, index) => (
                <Card
                  key={card._id + card.title}
                  card={card}
                  columnTitle={columnTitle}
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

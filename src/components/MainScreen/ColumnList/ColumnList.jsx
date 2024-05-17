import clsx from 'clsx';
import { Column } from '../Column/Column.jsx';
import styles from './ColumnList.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnListSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnListSkelleton/ColumnListSkelleton.jsx';
import { selectColumnsState } from '../../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

export const ColumnList = ({ data }) => {
  const { theme } = useAuth();
  const { isLoading: isColumnLoading } = useSelector(selectColumnsState);

  return isColumnLoading ? (
    <ColumnListSkelleton />
  ) : (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={clsx(styles.columnList, {
            [styles.columnListDark]: theme === 'dark',
            [styles.columnListLight]: theme === 'light',
            [styles.columnListViolet]: theme === 'violet',
          })}
        >
          {data &&
            data.columns.map((column, index) => (
              <Column key={column._id} column={column} index={index} />
            ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

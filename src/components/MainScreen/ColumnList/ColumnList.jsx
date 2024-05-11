import clsx from 'clsx';
import { Column } from '../Column/Column.jsx';
import styles from './ColumnList.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnListSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnListSkelleton/ColumnListSkelleton.jsx';
import { selectColumnsState } from '../../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';

export const ColumnList = ({ data }) => {
  const { theme } = useAuth();
  const { isLoading: isColumnLoading } = useSelector(selectColumnsState);

  return isColumnLoading ? (
    <ColumnListSkelleton />
  ) : (
    <>
      {' '}
      <ul
        className={clsx(styles.columnList, {
          [styles.columnListDark]: theme === 'dark',
          [styles.columnListLight]: theme === 'light',
          [styles.columnListViolet]: theme === 'violet',
        })}
      >
        {data &&
          data.columns.map((column) => (
            <Column key={column._id} column={column} />
          ))}
      </ul>{' '}
    </>
  );
};

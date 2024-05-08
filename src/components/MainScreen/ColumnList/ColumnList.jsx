import clsx from 'clsx';
import { Column } from '../Column/Column.jsx';
import styles from './ColumnList.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnListSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnListSkelleton/ColumnListSkelleton.jsx';

export const ColumnList = ({ data }) => {
  const theme = 'Dark';
  const { isLoading } = useAuth();

  return isLoading ? (
    <ColumnListSkelleton />
  ) : (
    <>
      {' '}
      <ul
        className={clsx(styles.columnList, {
          [styles.columnListDark]: theme === 'Dark',
          [styles.columnListLight]: theme === 'Light',
          [styles.columnListViolet]: theme === 'Violet',
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

import clsx from 'clsx';
import { Column } from '../Column/Column.jsx';
import styles from './ColumnList.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnListSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnListSkelleton/ColumnListSkelleton.jsx';

export const ColumnList = ({ data }) => {
  const { theme, isLoading } = useAuth();

  return isLoading ? (
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

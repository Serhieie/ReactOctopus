import clsx from 'clsx';
import { Column } from '../Column/Column.jsx';
import styles from './ColumnList.module.scss';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnListSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnListSkelleton/ColumnListSkelleton.jsx';
import { selectUserTheme } from '../../../redux/auth/authSelectors.js';
import { useSelector } from 'react-redux';

export const ColumnList = ({ data }) => {
  const theme = useSelector(selectUserTheme);
  const { isLoading } = useAuth();

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

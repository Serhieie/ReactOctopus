import clsx from 'clsx';
import { ColumnSkelleton } from '../ColumnSkelleton/ColumnSkelleton.jsx';
import styles from './ColumnListSkelleton.module.scss';
import { useAuth } from '../../../../hooks/useAuth.js';

export const ColumnListSkelleton = ({ data }) => {
  const { theme } = useAuth();

  return (
    <ul
      className={clsx(styles.columnList, {
        [styles.columnListDark]: theme === 'dark',
        [styles.columnListLight]: theme === 'light',
        [styles.columnListViolet]: theme === 'violet',
      })}
    >
      {data &&
        data.columns.map((column) => (
          <ColumnSkelleton key={column._id} column={column} />
        ))}
    </ul>
  );
};

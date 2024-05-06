import clsx from 'clsx';
import { ColumnSkelleton } from '../ColumnSkelleton/ColumnSkelleton.jsx';
import styles from './ColumnListSkelleton.module.scss';

export const ColumnListSkelleton = ({ data }) => {
  const theme = 'Dark';

  return (
    <ul
      className={clsx(styles.columnList, {
        [styles.columnListDark]: theme === 'Dark',
        [styles.columnListLight]: theme === 'Light',
        [styles.columnListViolet]: theme === 'Violet',
      })}
    >
      {data &&
        data.columns.map((column) => (
          <ColumnSkelleton key={column._id} column={column} />
        ))}
    </ul>
  );
};

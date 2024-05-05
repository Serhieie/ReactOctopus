import styles from './СolumnList.module.scss';
import clsx from 'clsx';
import { Column } from '../Column/Column.jsx';

export const ColumnList = ({ data }) => {
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
          <Column key={column._id} column={column} />
        ))}
    </ul>
  );
};

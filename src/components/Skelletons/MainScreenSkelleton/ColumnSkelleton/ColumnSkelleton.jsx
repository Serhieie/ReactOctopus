import styles from './ColumnSkelleton.module.scss';
import clsx from 'clsx';
import { ColumnHeadSkelleton } from '../ColumnHeadSkelleton/ColumnHeadSkelleton.jsx';
import { AddButtonSkelleton } from '../AddButtonSkelleton/AddButtonSkelleton.jsx';
import { CardListSkelleton } from '../CardListSkelleton/CardListSkelleton.jsx';

export const ColumnSkelleton = ({ column }) => {
  const theme = 'Dark';

  return (
    <li
      className={clsx(styles.column, {
        [styles.columnDark]: theme === 'Dark',
        [styles.columnLight]: theme === 'Light',
        [styles.columnViolet]: theme === 'Violet',
      })}
    >
      <ColumnHeadSkelleton column={column} />
      <CardListSkelleton data={column.cards} />
      <AddButtonSkelleton column={false} />
    </li>
  );
};

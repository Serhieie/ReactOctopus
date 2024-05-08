import styles from './ColumnSkelleton.module.scss';
import clsx from 'clsx';
import { ColumnHeadSkelleton } from '../ColumnHeadSkelleton/ColumnHeadSkelleton.jsx';
import { AddButtonSkelleton } from '../AddButtonSkelleton/AddButtonSkelleton.jsx';
import { CardListSkelleton } from '../CardListSkelleton/CardListSkelleton.jsx';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../../redux/auth/authSelectors.js';

export const ColumnSkelleton = ({ column }) => {
  const theme = useSelector(selectUserTheme);

  return (
    <li
      className={clsx(styles.column, {
        [styles.columnDark]: theme === 'dark',
        [styles.columnLight]: theme === 'light',
        [styles.columnViolet]: theme === 'violet',
      })}
    >
      <ColumnHeadSkelleton column={column} />
      <CardListSkelleton data={column.cards} />
      <AddButtonSkelleton column={false} />
    </li>
  );
};

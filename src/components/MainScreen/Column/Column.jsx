import styles from './Column.module.scss';
import clsx from 'clsx';
import { ColumnHead } from '../ColumnHead/ColumnHead.jsx';
import { AddButton } from '../AddButton/AddButton.jsx';
import { CardList } from '../CardList/CardList.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnSkelleton/ColumnSkelleton.jsx';

export const Column = ({ column }) => {
  const theme = 'dark';
  const { isLoading } = useAuth();

  const addCardFunc = () => {
    console.log('Add card func');
  };
  return isLoading ? (
    <ColumnSkelleton />
  ) : (
    <li
      className={clsx(styles.column, {
        [styles.columnDark]: theme === 'dark',
        [styles.columnLight]: theme === 'light',
        [styles.columnViolet]: theme === 'violet',
      })}
    >
      <ColumnHead column={column} />
      <CardList
        data={column.cards}
        columnTitle={column.title}
        columnId={column._id}
      />
      <AddButton column={false} addFunction={addCardFunc} />
    </li>
  );
};

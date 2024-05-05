import styles from './Column.module.scss';
import clsx from 'clsx';
import { ColumnHead } from '../ColumnHead/ColumnHead.jsx';
import { AddButton } from '../AddButton/AddButton.jsx';
import { CardList } from '../CardList/CardList.jsx';

export const Column = ({ column }) => {
  const theme = 'Dark';

  const addCardFunc = () => {
    console.log('Add card func');
  };
  return (
    <li
      className={clsx(styles.column, {
        [styles.columnDark]: theme === 'Dark',
        [styles.columnLight]: theme === 'Light',
        [styles.columnViolet]: theme === 'Violet',
      })}
    >
      <ColumnHead column={column} />
      <CardList data={column.cards} columnTitle={column.title} />
      <AddButton column={false} addFunction={addCardFunc} />
    </li>
  );
};

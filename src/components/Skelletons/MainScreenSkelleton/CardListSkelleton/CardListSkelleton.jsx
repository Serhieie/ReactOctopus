import styles from './CardListSkelleton.module.scss';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { CardSkelleton } from '../CardSkelleton/CardSkelleton.jsx';

export const CardListSkelleton = ({ data }) => {
  const theme = 'dark';

  return (
    <ul
      className={clsx(styles.cardList, {
        [styles.cardListDark]: theme === 'dark',
        [styles.cardListLight]: theme === 'light',
        [styles.cardListViolet]: theme === 'violet',
      })}
    >
      {data && data.map((card) => <CardSkelleton key={nanoid()} card={card} />)}
    </ul>
  );
};

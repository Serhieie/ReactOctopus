import styles from './CardList.module.scss';
import clsx from 'clsx';
import { Card } from '../Card/Card.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import { CardListSkelleton } from '../../Skelletons/MainScreenSkelleton/CardListSkelleton/CardListSkelleton.jsx';

export const CardList = ({ data, columnTitle }) => {
  const theme = 'Dark';
  const { isLoading } = useAuth();
  console.log(data);
  return isLoading ? (
    <CardListSkelleton />
  ) : (
    <ul
      className={clsx(styles.cardList, {
        [styles.cardListDark]: theme === 'Dark',
        [styles.cardListLight]: theme === 'Light',
        [styles.cardListViolet]: theme === 'Violet',
      })}
    >
      {data &&
        data.map((card) => (
          <Card key={card._id} card={card} columnTitle={columnTitle} />
        ))}
    </ul>
  );
};

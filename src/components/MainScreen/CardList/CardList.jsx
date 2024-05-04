import styles from './CardList.module.scss';
import clsx from 'clsx';
import { Card } from '../Card/Card.jsx';

export const CardList = ({ data }) => {
  const theme = 'Dark';
  console.log(data);
  return (
    <ul
      className={clsx(styles.cardList, {
        [styles.cardListDark]: theme === 'Dark',
        [styles.cardListLight]: theme === 'Light',
        [styles.cardListViolet]: theme === 'Violet',
      })}
    >
      {data && data.map((card) => <Card key={card._id} card={card} />)}
    </ul>
  );
};

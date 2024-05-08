import styles from './CardListSkelleton.module.scss';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { CardSkelleton } from '../CardSkelleton/CardSkelleton.jsx';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../../redux/auth/authSelectors.js';

export const CardListSkelleton = ({ data }) => {
  const theme = useSelector(selectUserTheme);

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

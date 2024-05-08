import { useSelector } from 'react-redux';
import styles from './CardSkelleton.module.scss';
import clsx from 'clsx';
import { selectUserTheme } from '../../../../redux/auth/authSelectors';

export const CardSkelleton = () => {
  const theme = useSelector(selectUserTheme);

  return (
    <li
      className={clsx(styles.card, {
        [styles.cardDark]: theme === 'dark',
        [styles.cardLight]: theme === 'light',
        [styles.cardViolet]: theme === 'violet',
      })}
    >
      <div className={styles.block0}></div>
      <div className={styles.block1}></div>
      <div className={styles.block2}></div>
      <hr className={styles.hr} />
      <div className={styles.bottom}>
        <div className={styles.blockRound}></div>
        <div className={styles.block3}></div>

        <div className={styles.block4}></div>
      </div>
    </li>
  );
};

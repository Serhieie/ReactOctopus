import styles from './Card.module.scss';
import clsx from 'clsx';

export const Card = ({ card }) => {
  const theme = 'Dark';

  return (
    <li
      className={clsx(styles.card, {
        [styles.cardDark]: theme === 'Dark',
        [styles.cardLight]: theme === 'Light',
        [styles.cardViolet]: theme === 'Violet',
      })}
    >
      <div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <div className={styles.radioButtons}>
          <label htmlFor="without" className={styles.radioButton}>
            Label color
            <input type="radio" name="priority" id="without" />
          </label>
          <label htmlFor="low" className={styles.radioButton}>
            Low
            <input type="radio" name="priority" id="low" />
          </label>
          <label htmlFor="medium" className={styles.radioButton}>
            Medium
            <input type="radio" name="priority" id="medium" />
          </label>
          <label htmlFor="high" className={styles.radioButton}>
            High
            <input type="radio" name="priority" id="high" />
          </label>
        </div>
        <label htmlFor="date">
          Deadline
          <input type="date" name="date" id="date" />
        </label>
      </div>
    </li>
  );
};

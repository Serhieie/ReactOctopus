import styles from './AddButtonSkelleton.module.scss';
import clsx from 'clsx';

export const AddButtonSkelleton = ({ column }) => {
  const theme = 'dark';

  const stylesDark = column
    ? styles.addColumnButtonDark
    : styles.addCardButtonDark;
  const stylesLight = column
    ? styles.addColumnButtonLight
    : styles.addCardButtonLight;
  const stylesViolet = column
    ? styles.addColumnButtonViolet
    : styles.addCardButtonViolet;

  return (
    <button
      type="button"
      className={clsx(styles.addColumnButton, {
        [stylesDark]: theme === 'dark',
        [stylesLight]: theme === 'light',
        [stylesViolet]: theme === 'violet',
        [styles.margin]: !column,
      })}
    >
      <span className={styles.addSpan}></span>
      <span className={styles.text}></span>
    </button>
  );
};

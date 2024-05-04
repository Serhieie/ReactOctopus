import styles from './AddButton.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

export const AddButton = ({ column, addFunction }) => {
  const theme = 'Dark';

  const handleClick = () => {
    addFunction();
  };

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
    <div
      onClick={handleClick}
      className={clsx(styles.addColumnButton, {
        [stylesDark]: theme === 'Dark',
        [stylesLight]: theme === 'Light',
        [stylesViolet]: theme === 'Violet',
        [styles.margin]: !column,
      })}
    >
      <div className={styles.addColumnFilling}>
        <span className={styles.addSpan}>
          <svg
            className={styles.iconAddColumn}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
          >
            <use xlinkHref={`${sprite}#icon-plus`} />
          </svg>
        </span>
        <p className={styles.addColumn}>
          Add another {column ? 'column' : 'card'}
        </p>
      </div>
    </div>
  );
};

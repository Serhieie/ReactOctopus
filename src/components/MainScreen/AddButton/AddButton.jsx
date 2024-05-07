import styles from './AddButton.module.scss';
import sprite from '../../../assets/sprite.svg';
import { useAuth } from '../../../hooks';
import clsx from 'clsx';
import { AddButtonSkelleton } from '../../Skelletons/MainScreenSkelleton/AddButtonSkelleton/AddButtonSkelleton';

export const AddButton = ({ column, addFunction }) => {
  const theme = 'Dark';
  const { isLoading } = useAuth();

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

  return isLoading ? (
    <AddButtonSkelleton />
  ) : (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(styles.addColumnButton, {
        [stylesDark]: theme === 'Dark',
        [stylesLight]: theme === 'Light',
        [stylesViolet]: theme === 'Violet',
        [styles.margin]: !column,
      })}
    >
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
      Add another {column ? 'column' : 'card'}
    </button>
  );
};

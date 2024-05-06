import styles from './ModalButton.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

const ModalButton = ({ type = 'button', text = 'Create' }) => {
  const theme = 'Violet';

  return (
    <button
      type={type}
      className={clsx(styles.addColumnButton, {
        [styles.addCardButtonDark]: theme === 'Dark',
        [styles.addCardButtonLight]: theme === 'Light',
        [styles.addCardButtonViolet]: theme === 'Violet',
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
      {text}
    </button>
  );
};

export default ModalButton;

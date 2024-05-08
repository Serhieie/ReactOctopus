import styles from './ModalButton.module.scss';
import sprite from '../../../assets/sprite.svg';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../redux/auth/authSelectors';

const ModalButton = ({ type = 'button', text = 'Create' }) => {
  const theme = useSelector(selectUserTheme);

  return (
    <button
      type={type}
      className={clsx(styles.addColumnButton, {
        [styles.addCardButtonDark]: theme === 'dark',
        [styles.addCardButtonLight]: theme === 'light',
        [styles.addCardButtonViolet]: theme === 'violet',
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

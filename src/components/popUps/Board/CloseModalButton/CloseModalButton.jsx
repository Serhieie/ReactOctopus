import css from './CloseModalButton.module.scss';
import clsx from 'clsx';

import Icons from '../../../../assets/sprite.svg';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../../../redux/auth/authSelectors';

const CloseModalButton = ({ onClick }) => {
  const theme = useSelector(selectUserTheme);

  return (
    <button onClick={onClick} type="button" className={css.modalClose}>
      <svg
        className={clsx(css.modalCloseIcon, {
          [css.modalCloseIconDark]: theme === 'dark',
          [css.modalCloseIconLight]: theme === 'light',
          [css.modalCloseIconViolet]: theme === 'violet',
        })}
        width="9"
        height="9"
      >
        <use xlinkHref={`${Icons}#icon-close-modal`} />
      </svg>
    </button>
  );
};

export default CloseModalButton;

import css from './CloseModalButton.module.scss';
import clsx from 'clsx';

import Icons from '../../../../assets/sprite.svg';

const CloseModalButton = ({ onClick }) => {
  const theme = 'Dark';

  return (
    <button onClick={onClick} type="button" className={css.modalClose}>
      <svg
        className={clsx(css.modalCloseIcon, {
          [css.modalCloseIconDark]: theme === 'Dark',
          [css.modalCloseIconLight]: theme === 'Light',
          [css.modalCloseIconViolet]: theme === 'Violet',
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

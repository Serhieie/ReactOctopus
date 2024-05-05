import css from './CloseModalButton.module.scss';

import Icons from '../../../../assets/sprite.svg';

const CloseModalButton = () => {
  return (
    <button type="button" className={css.modalClose}>
      <svg className={css.modalCloseIcon} width="9" height="9">
        <use xlinkHref={`${Icons}#icon-close-modal`} />
      </svg>
    </button>
  );
};

export default CloseModalButton;

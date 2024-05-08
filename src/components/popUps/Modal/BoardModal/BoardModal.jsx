import css from './BoardModal.module.scss';
import clsx from 'clsx';

const BoardModal = ({ children }) => {
  const theme = 'Dark';

  return (
    <div
      className={clsx(css.boardModal, {
        [css.boardModalDark]: theme === 'Dark',
        [css.boardModalLight]: theme === 'Light',
        [css.boardModalViolet]: theme === 'Violet',
      })}
    >
      {children}
    </div>
  );
};

export default BoardModal;

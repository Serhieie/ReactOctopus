import css from './BoardModal.module.scss';
import clsx from 'clsx';
import { useAuth } from '../../../../hooks';

const BoardModal = ({ children }) => {
  const { theme } = useAuth();

  return (
    <div
      className={clsx(css.boardModal, {
        [css.boardModalDark]: theme === 'dark',
        [css.boardModalLight]: theme === 'light',
        [css.boardModalViolet]: theme === 'violet',
      })}
    >
      {children}
    </div>
  );
};

export default BoardModal;

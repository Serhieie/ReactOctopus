import { useSelector } from 'react-redux';
import css from './BoardModal.module.scss';
import clsx from 'clsx';
import { selectUserTheme } from '../../../../redux/auth/authSelectors';

const BoardModal = ({ children }) => {
  const theme = useSelector(selectUserTheme);

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

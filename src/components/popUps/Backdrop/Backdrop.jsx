import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import css from './Backdrop.module.scss';

const Backdrop = ({ children, show }) => {
  const { theme } = useAuth();
  return (
    <div
      data-id="modal-backdrop"
      className={`${clsx(css.backdrop, {
        [css.backdropDark]: theme === 'dark',
        [css.backdropLight]: theme === 'light',
        [css.backdropViolet]: theme === 'violet',
      })} ${show ? '' : css.visuallyHidden}`}
    >
      {children}
    </div>
  );
};

export default Backdrop;

import css from './Backdrop.module.scss';

const Backdrop = ({ children, show }) => {
  return (
    <div className={`${css.backdrop} ${show ? '' : css.visuallyHidden}`}>
      {children}
    </div>
  );
};

export default Backdrop;

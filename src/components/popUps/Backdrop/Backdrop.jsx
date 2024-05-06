import css from './Backdrop.module.scss';

const Backdrop = ({ children, show = true }) => {
  return (
    <div className={`${css.backdrop} ${show ? '' : css.visuallyHidden}`}>
      {children}
    </div>
  );
};

export default Backdrop;

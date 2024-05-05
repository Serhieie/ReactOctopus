import css from './Backdrop.module.scss';

const Backdrop = ({ children }) => {
  return <div className={css.backdrop}>{children}</div>;
};

export default Backdrop;

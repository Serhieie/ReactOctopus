import css from './BoardModal.module.scss';

const BoardModal = ({ children }) => {
  return <div className={css.boardModal}>{children}</div>;
};

export default BoardModal;

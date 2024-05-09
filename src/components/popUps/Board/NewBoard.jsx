import css from './NewBoard.module.scss';
import clsx from 'clsx';
import BoardForm from './ColumnForm/BoardForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';

const NewBoard = ({ name, open, func }) => {
  const theme = 'Dark';
  return (
    <Backdrop show={open}>
      <BoardModal>
        <CloseModalButton onClick={func} />
        <p
          className={clsx(css.modalTitle, {
            [css.modalTitleDark]: theme === 'Dark',
            [css.modalTitleLight]: theme === 'Light',
            [css.modalTitleViolet]: theme === 'Violet',
          })}
        >
          {name}
        </p>
        <BoardForm action="Create" />
      </BoardModal>
    </Backdrop>
  );
};

export default NewBoard;

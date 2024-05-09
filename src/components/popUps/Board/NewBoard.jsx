import css from './NewBoard.module.scss';
import clsx from 'clsx';
import ColumnForm from './ColumnForm/ColumnForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import { useAuth } from '../../../hooks';

const NewBoard = ({ name, open, func }) => {
  const { theme } = useAuth();
  return (
    <Backdrop show={open}>
      <BoardModal>
        <CloseModalButton onClick={func} />
        <p
          className={clsx(css.modalTitle, {
            [css.modalTitleDark]: theme === 'dark',
            [css.modalTitleLight]: theme === 'light',
            [css.modalTitleViolet]: theme === 'violet',
          })}
        >
          {name}
        </p>
        <ColumnForm action="Create" />
      </BoardModal>
    </Backdrop>
  );
};

export default NewBoard;

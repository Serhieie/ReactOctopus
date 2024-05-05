import css from './NewBoard.module.scss';

import ColumnForm from './ColumnForm/ColumnForm';

import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';

const NewBoard = ({ name }) => {
  return (
    <Backdrop>
      <BoardModal>
        <CloseModalButton />
        <p className={css.modalTitle}>{name}</p>
        <ColumnForm />
      </BoardModal>
    </Backdrop>
  );
};

export default NewBoard;

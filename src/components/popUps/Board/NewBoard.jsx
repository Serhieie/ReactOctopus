import css from './NewBoard.module.scss';
import clsx from 'clsx';
import ColumnForm from './ColumnForm/ColumnForm';

import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import { useDispatch } from 'react-redux';
import { useIsPopUpOpen } from '../../../hooks/useIsPopUpOpen';
import { setIsAddBoardPopUpOpen } from '../../../redux/popUps/popUpsSlice';

const NewBoard = ({ name }) => {
  const theme = 'Dark';
  const dispatch = useDispatch();
  const { isAddBoardPopUpOpen } = useIsPopUpOpen();

  const handleCloseModal = () => {
    dispatch(setIsAddBoardPopUpOpen(false));
  };

  return (
    <Backdrop show={isAddBoardPopUpOpen}>
      <BoardModal>
        <CloseModalButton onClick={handleCloseModal} />
        <p
          className={clsx(css.modalTitle, {
            [css.modalTitleDark]: theme === 'Dark',
            [css.modalTitleLight]: theme === 'Light',
            [css.modalTitleViolet]: theme === 'Violet',
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

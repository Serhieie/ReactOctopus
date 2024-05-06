import css from './NewBoard.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

import ColumnForm from './ColumnForm/ColumnForm';

import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';

const NewBoard = ({ name, open = true }) => {
  const theme = 'Violet';

  const [showModal, setShowModal] = useState(open);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Backdrop show={showModal}>
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

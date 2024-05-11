import css from './AddColumn.module.scss';
import clsx from 'clsx';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';

import ColumnFormAdd from '../Board/ColumnForm/ColumnFormAdd';

const AddColumn = ({ name = 'Add Columns' }) => {
  const theme = 'Dark';
  const func = () => {
    console.log(123);
  };
  return (
    <Backdrop>
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
        <ColumnFormAdd action="Create" />
      </BoardModal>
    </Backdrop>
  );
};

export default AddColumn;

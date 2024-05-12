import css from './NewBoard.module.scss';
import clsx from 'clsx';
import BoardForm from './ColumnForm/BoardForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import { useAuth } from '../../../hooks';
import useClickOnBackdropToCloseModals from '../../../hooks/closeByClick';
import useEscapeKeyToCloseModals from '../../../hooks/closeByEscape';

const NewBoard = ({ name, open, func }) => {
  const { theme } = useAuth();

  useClickOnBackdropToCloseModals(func);
  useEscapeKeyToCloseModals(func);
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
        <BoardForm action="Create" />
      </BoardModal>
    </Backdrop>
  );
};

export default NewBoard;

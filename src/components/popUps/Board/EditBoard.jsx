import css from './NewBoard.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import BoardForm from './ColumnForm/BoardForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import {
  useClickOnBackdropToCloseModals,
  useEscapeKeyToCloseModals,
  useAuth,
} from '../../../hooks';

export const EditBoard = ({ name, open, item, func }) => {
  const { theme } = useAuth();

  const [board, setBoard] = useState({
    title: '',
    iconId: '',
    background: '',
  });
  const [loading, setLoading] = useState(true);
  useClickOnBackdropToCloseModals(func);
  useEscapeKeyToCloseModals(func);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBoard(item);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching board data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        {!loading && (
          <BoardForm data={board} action="Edit" item={item} func={func} />
        )}
      </BoardModal>
    </Backdrop>
  );
};

export default EditBoard;

import css from './NewBoard.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import ColumnForm from './ColumnForm/ColumnForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import { useAuth } from '../../../hooks';

const Board = ({ name, open, action = 'Create' }) => {
  const { theme } = useAuth();
  const [showModal, setShowModal] = useState(open);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({
    title: '',
    icon: '',
    background: '',
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get('/api/board');
        const response = {
          title: 'hhhhh',
          icon: 'star',
          background:
            'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575496/react-octopus/desctop/fekrlygw3hcac9ru0sqj.webp',
        };
        setBoard(response);
        setLoading(false);
        // setBoard(response.data);
      } catch (error) {
        console.error('Error fetching board data:', error);
        setLoading(false);
      }
    };

    if (action !== 'Create') {
      fetchData();
    }
  }, [loading]);

  return (
    <Backdrop show={showModal}>
      <BoardModal>
        <CloseModalButton onClick={handleCloseModal} />
        <p
          className={clsx(css.modalTitle, {
            [css.modalTitleDark]: theme === 'dark',
            [css.modalTitleLight]: theme === 'light',
            [css.modalTitleViolet]: theme === 'violet',
          })}
        >
          {name}
        </p>
        {action === 'Create' && <ColumnForm />}
        {action !== 'Create' && !loading && (
          <ColumnForm data={board} action={action} />
        )}
      </BoardModal>
    </Backdrop>
  );
};

export default Board;

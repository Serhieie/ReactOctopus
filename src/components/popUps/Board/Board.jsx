import css from './NewBoard.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import ColumnForm from './ColumnForm/ColumnForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';

const Board = ({ name, open = true, action = 'Create' }) => {
  const theme = 'Violet';

  const [board, setBoard] = useState({
    title: '',
    icon: '',
    background: '',
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(open);

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
      console.log(loading);
      fetchData();
    }
  }, [loading]);

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
        {action === 'Create' && <ColumnForm />}
        {action !== 'Create' && !loading && (
          <ColumnForm data={board} action={action} />
        )}
      </BoardModal>
    </Backdrop>
  );
};

export default Board;
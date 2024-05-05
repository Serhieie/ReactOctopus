import css from './NewBoard.module.scss';
import { useState, useEffect } from 'react';

import ColumnForm from './ColumnForm/ColumnForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';

const EditBoard = ({ name }) => {
  const [board, setBoard] = useState({
    title: '',
    icon: '',
    background: '',
  });
  const [loading, setLoading] = useState(true);

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
    fetchData();
  }, []);

  return (
    <Backdrop>
      <BoardModal>
        <CloseModalButton />
        <p className={css.modalTitle}>{name}</p>
        {!loading && <ColumnForm data={board} />}
      </BoardModal>
    </Backdrop>
  );
};

export default EditBoard;

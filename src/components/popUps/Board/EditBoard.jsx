import css from './NewBoard.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import BoardForm from './ColumnForm/BoardForm';
import CloseModalButton from './CloseModalButton/CloseModalButton';
import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';

const EditBoard = ({ name, open, item, func }) => {
  const theme = 'Dark';

  const [board, setBoard] = useState({
    title: '',
    iconId: '',
    background: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get('/api/board');
        // const response = {
        //   title: 'hhhhh',
        //   icon: 'star',
        //   background:
        //     'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575496/react-octopus/desctop/fekrlygw3hcac9ru0sqj.webp',
        // };
        setBoard(item);
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
    <Backdrop show={open}>
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
        {!loading && <BoardForm data={board} action="Edit" item={item} />}
      </BoardModal>
    </Backdrop>
  );
};

export default EditBoard;

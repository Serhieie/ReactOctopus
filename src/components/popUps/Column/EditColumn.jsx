import css from './EditColumn.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import Backdrop from '../Backdrop/Backdrop';
import BoardModal from '../Modal/BoardModal/BoardModal';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';

import ColumnFormAdd from '../Board/ColumnForm/ColumnFormAdd';

const EditColumn = ({ name, item, func }) => {
  const theme = 'Dark';

  const [column, setColumn] = useState({
    title: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = {
          title: 'hhhhh',
        };
        setColumn(response);
        setLoading(false);
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
        {!loading && <ColumnFormAdd data={column} action="Edit" item={item} />}
      </BoardModal>
    </Backdrop>
  );
};

export default EditColumn;

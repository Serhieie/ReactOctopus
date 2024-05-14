import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import InputForm from '../InputForm/InputForm';
import ModalButton from '../../ModalButton/ModalButton';
import { useDispatch } from 'react-redux';
import {
  addBoard,
  editeBoardOperation,
} from '../../../../redux/tasks/boards/boardsOperations';

const INITIAL_STATE = {
  title: '',
};

const ColumnFormAdd = ({
  action = 'Create',
  data = INITIAL_STATE,
  item = null,
}) => {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState({
    ...data,
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setColumns({
      ...columns,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (columns.title === '') {
      toast.error('Title is required');
    } else {
      try {
        if (action === 'Create') {
          dispatch(addBoard({ ...columns }));
        } else {
          if (item)
            dispatch(
              editeBoardOperation({
                boardId: item._id,
                body: {
                  title: columns.title,
                  iconId: columns.iconId,
                  background: columns.background,
                },
              })
            );
        }
        reset();
      } catch (error) {
        console.error('Error saving form data:', error);
      }
      reset();
    }
  };

  const reset = () => {
    setColumns({ ...INITIAL_STATE });
  };

  const { title } = columns;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm onChange={handleChange} value={title} />
        <ModalButton type="submit" text={action} />
      </form>
      <ToastContainer position="top-right" />
    </>
  );
};

export default ColumnFormAdd;

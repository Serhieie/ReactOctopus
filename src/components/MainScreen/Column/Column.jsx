import styles from './Column.module.scss';
import clsx from 'clsx';
import { ColumnHead } from '../ColumnHead/ColumnHead.jsx';
import { AddButton } from '../AddButton/AddButton.jsx';
import { CardList } from '../CardList/CardList.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnSkelleton/ColumnSkelleton.jsx';
import { useState } from 'react';
import ModalPortal from '../../popUps/ModalPortal.jsx';
import { selectColumnsState } from '../../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';
import CardModal from '../../popUps/cardModal/CardModal.jsx';
import AddEditCardForm from '../../popUps/cardModal/AddEditCardForm.jsx';
import { Draggable } from 'react-beautiful-dnd';

export const Column = ({ column, index }) => {
  const { theme } = useAuth();
  const { isLoading: isColumnLoading } = useSelector(selectColumnsState);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  // (cardData = initialValues), (columnId = null);
  const closeAddCardModal = () => {
    setIsAddCardModalOpen(false);
  };
  const openAddCardModal = () => {
    setIsAddCardModalOpen(true);
  };
  return isColumnLoading ? (
    <ColumnSkelleton />
  ) : (
    <>
      <Draggable draggableId={column?._id} index={index}>
        {(provided, snapshot) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            data-column-id={column._id}
            className={clsx(styles.column, {
              [styles.columnDark]: theme === 'dark',
              [styles.columnLight]: theme === 'light',
              [styles.columnViolet]: theme === 'violet',
            })}
          >
            <ColumnHead column={column} isDragging={snapshot.isDragging} />
            <CardList column={column} />
            <AddButton column={false} addFunction={openAddCardModal} />
          </li>
        )}
      </Draggable>
      <ModalPortal>
        {isAddCardModalOpen && (
          <CardModal func={closeAddCardModal} name={'Add card'}>
            <AddEditCardForm
              columnId={column._id}
              func={closeAddCardModal}
              action="Create"
            />
          </CardModal>
        )}
      </ModalPortal>
    </>
  );
};

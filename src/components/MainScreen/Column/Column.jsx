import styles from './Column.module.scss';
import clsx from 'clsx';
import { ColumnHead } from '../ColumnHead/ColumnHead.jsx';
import { AddButton } from '../AddButton/AddButton.jsx';
import { CardList } from '../CardList/CardList.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import { ColumnSkelleton } from '../../Skelletons/MainScreenSkelleton/ColumnSkelleton/ColumnSkelleton.jsx';
import { useState } from 'react';
import ModalPortal from '../../popUps/ModalPortal.jsx';
import AddEditCardForm from '../../popUps/cardModal/AddEditCardForm.jsx';
import { selectColumnsState } from '../../../redux/tasks/tasksSelectors.js';
import { useSelector } from 'react-redux';

export const Column = ({ column }) => {
  const { theme } = useAuth();
  const { isLoading: isColumnLoading } = useSelector(selectColumnsState);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  // (cardData = initialValues), (columnId = null);
  const toggleAddCardModal = () => {
    setIsAddCardModalOpen((state) => !state);
  };
  return isColumnLoading ? (
    <ColumnSkelleton />
  ) : (
    <>
      {' '}
      <li
        data-column-id={column._id}
        className={clsx(styles.column, {
          [styles.columnDark]: theme === 'dark',
          [styles.columnLight]: theme === 'light',
          [styles.columnViolet]: theme === 'violet',
        })}
      >
        <ColumnHead column={column} />
        <CardList column={column} />
        <AddButton column={false} addFunction={toggleAddCardModal} />
      </li>
      <ModalPortal>
        {isAddCardModalOpen && <AddEditCardForm columnId={column._id} />}
      </ModalPortal>
    </>
  );
};

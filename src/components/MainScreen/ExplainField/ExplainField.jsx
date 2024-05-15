import styles from './ExplainField.module.scss';
import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import ModalPortal from '../../popUps/ModalPortal';
import NewBoard from '../../popUps/Board/NewBoard';
import { useState } from 'react';

export const ExplainField = () => {
  const { theme } = useAuth();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddBoardModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddBoardModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(styles.explainField, {
          [styles.explainFieldDark]: theme === 'dark',
          [styles.explainFieldLight]: theme === 'light',
          [styles.explainFieldViolet]: theme === 'violet',
        })}
      >
        <p className={styles.explainText}>
          {' '}
          Before starting your project, it is essential{' '}
          <button
            type="button"
            onClick={openAddBoardModal}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.explainSpan}>to create a board</span>
          </button>{' '}
          to visualize and track all the necessary tasks and milestones. This
          board serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </p>
      </div>
      <ModalPortal>
        <NewBoard
          name="Add board"
          open={isAddModalOpen}
          func={closeAddBoardModal}
        />
      </ModalPortal>
    </>
  );
};

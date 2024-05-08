import LogoSprite from '../../../assets/sprite.svg';
import clsx from 'clsx';

import styles from './CreateBoardButton.module.scss';
import NewBoard from '../../popUps/Board/NewBoard';
import ModalPortal from '../../popUps/ModalPortal';
import { useState } from 'react';

const CreateBoardButton = ({ theme }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddBoardModal = () => {
    console.log('Open Modal', isAddModalOpen);
    setIsAddModalOpen(true);
  };

  const closeAddBoardModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div
        className={clsx(styles.sidebar_create_con, {
          [styles.sidebar_create_conDark]: theme === 'dark',
          [styles.sidebar_create_conLight]: theme === 'light',
          [styles.sidebar_create_conViolet]: theme === 'violet',
        })}
      >
        <p className={styles.sidebar_create_title}>Create a new board</p>
        <button
          onClick={openAddBoardModal}
          type="button"
          className={styles.sidebar_create_btn}
        >
          <svg className={styles.sidebar_create_ico} width="20" height="20">
            <use xlinkHref={`${LogoSprite}#icon-plus`}></use>
          </svg>
        </button>
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

export default CreateBoardButton;

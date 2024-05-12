import css from './UserEditModal.module.scss';
import clsx from 'clsx';

import CloseModalButton from '../popUps/Board/CloseModalButton/CloseModalButton';
import BoardModal from '../popUps/Modal/BoardModal/BoardModal';
import { useAuth } from '../../hooks';
import UserEditModalForm from './UserEditModalForm/UserEditModalForm';
import Backdrop from '../popUps/Backdrop/Backdrop';

const UserEditModal = ({ name, open, func }) => {
  const { theme, user } = useAuth();
  return (
    <Backdrop show={open}>
      <BoardModal>
        <CloseModalButton onClick={func} />
        <p
          className={clsx(css.modalTitle, {
            [css.modalTitleDark]: theme === 'dark',
            [css.modalTitleLight]: theme === 'light',
            [css.modalTitleViolet]: theme === 'violet',
          })}
        >
          {name}
        </p>
        <UserEditModalForm userData={user} func={func} />
      </BoardModal>
    </Backdrop>
  );
};

export default UserEditModal;

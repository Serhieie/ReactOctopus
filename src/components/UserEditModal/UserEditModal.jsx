import css from './UserEditModal.module.scss';
import clsx from 'clsx';

import CloseModalButton from '../popUps/Board/CloseModalButton/CloseModalButton';
import { Backdrop } from '@mui/material';
import BoardModal from '../popUps/Modal/BoardModal/BoardModal';
import { useAuth } from '../../hooks';
import UserEditModalForm from './UserEditModalForm/UserEditModalForm';

const UserEditModal = ({ name, open, func }) => {
  const { theme, user } = useAuth();
  return (
    <Backdrop open={open}>
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
        <UserEditModalForm userData={user} />
      </BoardModal>
    </Backdrop>
  );
};

export default UserEditModal;

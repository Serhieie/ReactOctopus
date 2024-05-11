import css from './UserEditModal.module.scss';
import clsx from 'clsx';

import ColumnForm from '../popUps/Board/ColumnForm/ColumnForm';
import CloseModalButton from '../popUps/Board/CloseModalButton/CloseModalButton';
import { Backdrop } from '@mui/material';
import BoardModal from '../popUps/Modal/BoardModal/BoardModal';
import { useAuth } from '../../hooks';
import UserEditModalForm from './UserEditModalForm/UserEditModalForm';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/auth/authOperations';
import UserEditAvatarForm from './UserEditAvatarForm/UserEditAvatarForm';

const UserEditModal = ({ name, open, func }) => {
  const { theme, user } = useAuth();

  const dispatch = useDispatch();

  const onUpdateUser = (data) => {
    dispatch(updateUser(data));
  };

  return (
    <Backdrop open={true}>
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
        {/* <ColumnForm action="Edit" /> */}
      </BoardModal>
    </Backdrop>
  );
};

export default UserEditModal;

import React from 'react';
import css from '../LogoutButton/LogoutButton.scss';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/auth/authOperations';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
  };
  return (
    <section className={css.logoutButton}>
      <button className={css.button} type="button" onClick={onLogout}>
        Log out
      </button>
    </section>
  );
};

export default LogoutButton;
